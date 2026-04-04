# CPC-QA Hostinger Email Auto-Reply (HTML)

## Setup Instructions

1. Log into Hostinger hPanel
2. Go to **Emails** → Select your domain (cpc-qa.com)
3. Click **Manage** next to info@cpc-qa.com
4. Find **Auto-Responder** or **Vacation/Out of Office**
5. **Disable "Use plain text"** — Enable HTML mode
6. Paste the HTML code below
7. Save

---

## Subject

```
Thank You for Contacting CPC
```

---

## Option 1: Plain Text (No HTML - Most Compatible)

**Copy this** (no HTML, no emojis, no special characters):

```
Thank you for contacting Cosmo Projects Construction (CPC).

We have received your inquiry and a member of our team will respond within 24-48 business hours.

For urgent matters or specific departments, please contact:
- General Inquiries: inquiry@cpc-qa.com
- Sales & Quotations: sales@cpc-qa.com
- Technical Support: support@cpc-qa.com

---

CPC - Road Construction & Infrastructure
Commercial Registration: 108122

Office Location:
Mirqab Mall, Al Mirqab Al Jadeed Street
Doha, Qatar

Website: www.cpc-qa.com

Our Services:
- Road Construction & Asphalt Works
- Earthworks & Subgrade/Subbase
- Infrastructure Development
- Road Marking & Safety
- Interlock & Kerbstone Installation

We look forward to serving you.

Best regards,
CPC Team
```

---

## Option 2: Simple HTML (No Emojis or Arabic)

**Try this if HTML works**:

```html
<center>
<img src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312003/cpc-website/cpc_logo-removebg-preview.png" alt="CPC Logo" width="120">
</center>

<p><strong>Thank you for contacting Cosmo Projects Construction (CPC).</strong></p>

<p>We have received your inquiry and a member of our team will respond within <strong>24-48 business hours</strong>.</p>

<p><strong>For urgent matters or specific departments:</strong></p>
<ul>
<li>General Inquiries: <a href="mailto:inquiry@cpc-qa.com">inquiry@cpc-qa.com</a></li>
<li>Sales &amp; Quotations: <a href="mailto:sales@cpc-qa.com">sales@cpc-qa.com</a></li>
<li>Technical Support: <a href="mailto:support@cpc-qa.com">support@cpc-qa.com</a></li>
</ul>

<hr>

<p><strong>CPC - Road Construction &amp; Infrastructure</strong><br>
Commercial Registration: 108122</p>

<p><strong>Office Location:</strong><br>
Mirqab Mall, Al Mirqab Al Jadeed Street<br>
Doha, Qatar</p>

<p><strong>Website:</strong> <a href="https://cpc-qa.com">www.cpc-qa.com</a></p>

<p><strong>Our Services:</strong></p>
<ul>
<li>Road Construction &amp; Asphalt Works</li>
<li>Earthworks &amp; Subgrade/Subbase</li>
<li>Infrastructure Development</li>
<li>Road Marking &amp; Safety</li>
<li>Interlock &amp; Kerbstone Installation</li>
</ul>

<p>We look forward to serving you.</p>

<p><strong>Best regards,</strong><br>
CPC Team</p>
```

---

## Settings

- ✅ **Start immediately**: Yes
- ✅ **Never end**: Yes
- ❌ **Use plain text**: No (Disable this!)
- **Email**: info@cpc-qa.com

---

## Logo URL (for reference)

```
https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312003/cpc-website/cpc_logo-removebg-preview.png
```

---

## Email Signature (For Outgoing Emails)

**Setup:** Go to Webmail → Settings → **Signature**

### Signature Template (HTML - Paragraph Format)

**Replace [YOUR NAME] and [YOUR TITLE] with actual details:**

```html
<p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; border-top: 3px solid #D4AF37; padding-top: 15px; margin-top: 20px;">
<strong style="font-size: 16px; color: #1a1a1a;">[YOUR NAME]</strong><br>
<span style="color: #666;">[YOUR TITLE]</span><br>
<br>
<strong style="color: #D4AF37;">Cosmo Projects Construction (CPC)</strong><br>
<span style="font-size: 13px; color: #555;">Road Construction &amp; Infrastructure</span><br>
<br>
<span style="font-size: 13px;">
<strong>Office:</strong> Mirqab Mall, Al Mirqab Al Jadeed St, Doha, Qatar<br>
<strong>Email:</strong> <a href="mailto:info@cpc-qa.com" style="color: #D4AF37; text-decoration: none;">info@cpc-qa.com</a><br>
<strong>Web:</strong> <a href="https://cpc-qa.com" style="color: #D4AF37; text-decoration: none;">www.cpc-qa.com</a><br>
<strong>CR:</strong> 108122
</span>
</p>
```

### Alternative: Compact Signature (If table doesn't work)

```html
<p style="font-family: Arial, sans-serif; font-size: 13px; color: #333; border-top: 2px solid #D4AF37; padding-top: 10px; margin-top: 20px;">
<strong style="font-size: 15px;">[YOUR NAME]</strong><br>
<span style="color: #666;">[YOUR TITLE]</span><br>
<br>
<strong style="color: #D4AF37;">Cosmo Projects Construction (CPC)</strong><br>
Road Construction &amp; Infrastructure<br>
<br>
Mirqab Mall, Al Mirqab Al Jadeed St, Doha, Qatar<br>
<a href="https://cpc-qa.com" style="color: #D4AF37;">www.cpc-qa.com</a> | CR: 108122
</p>
```

### Example Signature (Filled In)

```html
<p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; border-top: 3px solid #D4AF37; padding-top: 15px; margin-top: 20px;">
<strong style="font-size: 16px; color: #1a1a1a;">Ahmed Al-Hassan</strong><br>
<span style="color: #666;">Sales Manager</span><br>
<br>
<strong style="color: #D4AF37;">Cosmo Projects Construction (CPC)</strong><br>
<span style="font-size: 13px; color: #555;">Road Construction &amp; Infrastructure</span><br>
<br>
<span style="font-size: 13px;">
<strong>Office:</strong> Mirqab Mall, Al Mirqab Al Jadeed St, Doha, Qatar<br>
<strong>Email:</strong> <a href="mailto:sales@cpc-qa.com" style="color: #D4AF37; text-decoration: none;">sales@cpc-qa.com</a><br>
<strong>Web:</strong> <a href="https://cpc-qa.com" style="color: #D4AF37; text-decoration: none;">www.cpc-qa.com</a><br>
<strong>CR:</strong> 108122
</span>
</p>
```

---

*Last updated: April 4, 2026*
