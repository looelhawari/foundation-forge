import { NextRequest, NextResponse } from "next/server";
// @ts-ignore - imap-simple doesn't have great TypeScript support
import imaps from "imap-simple";
import { simpleParser } from "mailparser";

export const dynamic = "force-dynamic";

// Email aliases that route to the main mailbox
const EMAIL_ALIASES: Record<string, string> = {
  info: "info@cpc-qa.com",
  accounts: "accounts@cpc-qa.com",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { mailboxId: string } }
) {
  const { mailboxId } = params;

  // All aliases use the same main mailbox credentials
  const user = process.env.IMAP_USER;
  const password = process.env.IMAP_PASSWORD;

  if (!user || !password) {
    return NextResponse.json(
      { error: "IMAP credentials not configured" },
      { status: 500 }
    );
  }

  // Get the alias email address for filtering
  const aliasEmail = EMAIL_ALIASES[mailboxId];

  try {
    const config = {
      imap: {
        user,
        password,
        host: process.env.IMAP_HOST || "imap.hostinger.com",
        port: parseInt(process.env.IMAP_PORT || "993"),
        tls: process.env.IMAP_SECURE === "true",
        authTimeout: 10000,
        tlsOptions: {
          rejectUnauthorized: false,
        },
      },
    };

    console.log(`Connecting to IMAP for ${user}...`);

    // Connect to IMAP server
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    // Get mailbox status for counts
    const boxInfo = connection.imap._box;
    const totalEmails = boxInfo?.messages?.total || 0;
    const unseenEmails = boxInfo?.messages?.unseen || 0;

    // Search for emails
    const searchCriteria = ["ALL"];
    const fetchOptions = {
      bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)", "TEXT", ""],
      markSeen: false,
      struct: true,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    console.log(`Found ${messages.length} total messages`);

    // Parse emails (get last 100, newest first)
    const allEmails = await Promise.all(
      messages
        .slice(-100)
        .reverse()
        .map(async (item: any) => {
          try {
            const all = item.parts.find((part: any) => part.which === "");
            const id = item.attributes.uid;

            if (!all) return null;

            const parsed = await simpleParser(all.body);

            return {
              id: id.toString(),
              from: parsed.from?.text || "",
              to: parsed.to?.text || "",
              subject: parsed.subject || "(No Subject)",
              preview: (parsed.text || "").substring(0, 150).replace(/\n/g, " "),
              body: parsed.text || parsed.html || "",
              date: parsed.date || new Date(),
              read: item.attributes.flags.includes("\\Seen"),
              starred: item.attributes.flags.includes("\\Flagged"),
              hasAttachment: parsed.attachments && parsed.attachments.length > 0,
            };
          } catch (parseError) {
            console.error("Error parsing email:", parseError);
            return null;
          }
        })
    );

    await connection.end();

    // Filter emails by alias if not "info" (main inbox)
    let filteredEmails = allEmails.filter((e) => e !== null);
    
    if (aliasEmail && mailboxId !== "info") {
      // Filter emails sent TO this specific alias
      filteredEmails = filteredEmails.filter((email: any) => 
        email.to.toLowerCase().includes(aliasEmail.toLowerCase())
      );
    }

    // Count unread for this filtered set
    const unreadCount = filteredEmails.filter((e: any) => !e.read).length;

    console.log(`Returning ${filteredEmails.length} emails for ${mailboxId}`);

    return NextResponse.json({
      success: true,
      emails: filteredEmails,
      count: filteredEmails.length,
      unreadCount: unreadCount,
      totalInbox: totalEmails,
      unseenInbox: unseenEmails,
    });
  } catch (error: any) {
    console.error("IMAP Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch emails",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
