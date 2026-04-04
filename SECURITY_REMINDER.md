# 🔒 SECURITY REMINDER - Email Credentials

## ⚠️ IMPORTANT: Credentials Exposed in Chat

Your email credentials were shared in this conversation:
- **Email**: info@cpc-qa.com
- **Password**: cpc-qa.com@Khan2026

### Immediate Security Actions Required:

1. **✅ DONE**: Credentials saved to `.env.local` (gitignored)
2. **⚠️ TODO**: Change your email password after this session
3. **⚠️ TODO**: Consider using app-specific passwords instead

---

## How to Change Password (Recommended):

1. Log into **Hostinger hPanel**
2. Go to **Emails** → **Manage** (info@cpc-qa.com)
3. Click **Change Password**
4. Set a new strong password
5. Update `.env.local` with the new password

---

## Better Security: App-Specific Passwords

Instead of using your main email password, create app-specific passwords:

1. Check if Hostinger supports app passwords
2. Create separate passwords for:
   - IMAP access (mailbox feature)
   - SMTP access (sending emails)
   - Webmail access (manual login)

---

## What's Protected:

✅ `.env.local` is in `.gitignore` - won't be committed  
✅ API route only accessible to logged-in admins  
✅ Credentials stored as environment variables (server-side only)  
✅ IMAP connection uses TLS encryption

---

## What to Monitor:

- Unusual login attempts in Hostinger
- Unexpected emails sent from your account
- Changes to auto-responder settings

---

## Current Mailboxes Using Same Password:

All 4 mailboxes currently use the same password:
- info@cpc-qa.com
- sales@cpc-qa.com
- support@cpc-qa.com
- inquiry@cpc-qa.com

**Recommendation**: Set individual passwords for each mailbox and update `.env.local`

---

*Created: April 4, 2026*
*Action Required: Rotate password within 24 hours*
