import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import imaps from "imap-simple";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emailId, action } = body;

    if (!emailId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: emailId, action" },
        { status: 400 }
      );
    }

    const user = process.env.IMAP_USER;
    const password = process.env.IMAP_PASSWORD;

    if (!user || !password) {
      return NextResponse.json(
        { error: "IMAP credentials not configured" },
        { status: 500 }
      );
    }

    const config = {
      imap: {
        user,
        password,
        host: process.env.IMAP_HOST || "imap.hostinger.com",
        port: parseInt(process.env.IMAP_PORT || "993"),
        tls: true,
        authTimeout: 10000,
        tlsOptions: { rejectUnauthorized: false },
      },
    };

    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const uid = parseInt(emailId);

    switch (action) {
      case "delete":
        // Move to Trash by adding \Deleted flag and expunging
        await connection.addFlags(uid, ["\\Deleted"]);
        await connection.imap.expunge();
        console.log(`Deleted email ${uid}`);
        break;

      case "star":
        await connection.addFlags(uid, ["\\Flagged"]);
        console.log(`Starred email ${uid}`);
        break;

      case "unstar":
        await connection.delFlags(uid, ["\\Flagged"]);
        console.log(`Unstarred email ${uid}`);
        break;

      case "read":
        await connection.addFlags(uid, ["\\Seen"]);
        console.log(`Marked email ${uid} as read`);
        break;

      case "unread":
        await connection.delFlags(uid, ["\\Seen"]);
        console.log(`Marked email ${uid} as unread`);
        break;

      default:
        await connection.end();
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      action,
      emailId,
    });
  } catch (error: any) {
    console.error("IMAP Action Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to perform action" },
      { status: 500 }
    );
  }
}
