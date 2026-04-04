# Mailboxes Feature - IMAP Integration Guide

## Overview
The Mailboxes page allows you to view and manage emails from all CPC mailboxes directly within the admin dashboard.

## Current Status
✅ UI/UX Complete (displaying dummy data)  
⏳ IMAP Integration Pending

---

## How to Enable Real Email Fetching

### Step 1: Get Hostinger IMAP Credentials

1. Log into **Hostinger hPanel**
2. Go to **Emails** → Your domain (cpc-qa.com)
3. Use these settings:

```
IMAP Server: imap.hostinger.com
IMAP Port: 993 (SSL/TLS)
Username: full email address (e.g., info@cpc-qa.com)
Password: your email password
```

### Step 2: Add Environment Variables

Create/update `.env.local` in `frontend-next/` directory:

```env
# Hostinger IMAP Configuration
IMAP_HOST=imap.hostinger.com
IMAP_PORT=993
IMAP_SECURE=true

# Email Account Credentials (one set per mailbox)
IMAP_INFO_USER=info@cpc-qa.com
IMAP_INFO_PASSWORD=your_password_here

IMAP_SALES_USER=sales@cpc-qa.com
IMAP_SALES_PASSWORD=your_password_here

IMAP_SUPPORT_USER=support@cpc-qa.com
IMAP_SUPPORT_PASSWORD=your_password_here

IMAP_INQUIRY_USER=inquiry@cpc-qa.com
IMAP_INQUIRY_PASSWORD=your_password_here
```

### Step 3: Install IMAP Library

```bash
cd frontend-next
npm install imap-simple mailparser
npm install --save-dev @types/imap-simple
```

### Step 4: Create API Route

Create `frontend-next/src/app/api/mailbox/[mailboxId]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import imaps from "imap-simple";
import { simpleParser } from "mailparser";

export async function GET(
  request: NextRequest,
  { params }: { params: { mailboxId: string } }
) {
  const { mailboxId } = params;

  // Get credentials from environment
  const user = process.env[`IMAP_${mailboxId.toUpperCase()}_USER`];
  const password = process.env[`IMAP_${mailboxId.toUpperCase()}_PASSWORD`];

  if (!user || !password) {
    return NextResponse.json(
      { error: "Mailbox credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const config = {
      imap: {
        user,
        password,
        host: process.env.IMAP_HOST || "imap.hostinger.com",
        port: parseInt(process.env.IMAP_PORT || "993"),
        tls: process.env.IMAP_SECURE === "true",
        authTimeout: 10000,
      },
    };

    // Connect to IMAP server
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    // Search for emails (last 50)
    const searchCriteria = ["ALL"];
    const fetchOptions = {
      bodies: ["HEADER", "TEXT"],
      markSeen: false,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    // Parse emails
    const emails = await Promise.all(
      messages.slice(-50).reverse().map(async (item) => {
        const all = item.parts.find((part) => part.which === "TEXT");
        const id = item.attributes.uid;
        const header = item.parts.find((part) => part.which === "HEADER");

        if (!header || !all) return null;

        const parsed = await simpleParser(all.body);

        return {
          id: id.toString(),
          from: parsed.from?.text || "",
          to: parsed.to?.text || "",
          subject: parsed.subject || "(No Subject)",
          preview: parsed.text?.substring(0, 150) || "",
          body: parsed.text || "",
          date: parsed.date || new Date(),
          read: item.attributes.flags.includes("\\Seen"),
          starred: item.attributes.flags.includes("\\Flagged"),
          hasAttachment: parsed.attachments.length > 0,
        };
      })
    );

    await connection.end();

    return NextResponse.json({
      emails: emails.filter((e) => e !== null),
    });
  } catch (error: any) {
    console.error("IMAP Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
```

### Step 5: Update Frontend to Use API

In `page-client.tsx`, replace the `fetchEmails` function:

```typescript
const fetchEmails = async (mailboxId: string) => {
  setLoading(true);
  try {
    const response = await fetch(`/api/mailbox/${mailboxId}`);
    const data = await response.json();
    
    if (data.error) {
      console.error("Error fetching emails:", data.error);
      setEmails([]);
    } else {
      setEmails(data.emails);
    }
  } catch (error) {
    console.error("Failed to fetch emails:", error);
    setEmails([]);
  } finally {
    setLoading(false);
  }
};
```

---

## Security Best Practices

1. **Never commit `.env.local`** to Git (already in .gitignore)
2. **Use App Passwords** instead of main email passwords if available
3. **Enable 2FA** on Hostinger account
4. **Rotate passwords** regularly
5. **Limit API access** to authenticated admin users only

---

## Features Implemented

✅ Multiple mailbox support (info, sales, support, inquiry)  
✅ Email list with search and filters  
✅ Email detail view  
✅ Unread count badges  
✅ Starred emails  
✅ Attachment indicators  
✅ Responsive design  

## Features To Add (Future)

- [ ] Mark as read/unread
- [ ] Star/unstar emails
- [ ] Delete emails
- [ ] Reply functionality
- [ ] Forward functionality
- [ ] Download attachments
- [ ] Pagination for large inboxes
- [ ] Real-time email notifications

---

## Troubleshooting

**Problem:** "Connection timeout"  
**Solution:** Check if Hostinger IMAP is enabled for your account and firewall allows port 993

**Problem:** "Authentication failed"  
**Solution:** Verify email address and password are correct. Try using an app-specific password.

**Problem:** "SSL/TLS error"  
**Solution:** Ensure `IMAP_SECURE=true` in environment variables

---

## Hostinger Support Links

- **Webmail Access:** https://mail.hostinger.com
- **IMAP Settings:** https://support.hostinger.com/en/articles/1583478-how-to-set-up-an-email-account-on-an-email-client
- **Email Troubleshooting:** https://support.hostinger.com/en/collections/1586294-email

---

*Last Updated: April 4, 2026*
