import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, text, html, replyTo, inReplyTo } = body;

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, and text or html" },
        { status: 400 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER || process.env.IMAP_USER,
        pass: process.env.SMTP_PASSWORD || process.env.IMAP_PASSWORD,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"CPC Qatar" <${process.env.SMTP_USER || process.env.IMAP_USER}>`,
      to,
      subject,
      text,
      html,
      replyTo: replyTo || undefined,
      inReplyTo: inReplyTo || undefined,
    });

    console.log("Email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("SMTP Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
