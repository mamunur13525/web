import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
console.log({name, email,message})
    // Configure Nodemailer transporter
    // Note: In production, these should be environment variables.
    // Specifying defaults to avoid throwing if env vars are missing during dev/no-setup
    console.log({user:process.env.SMTP_USER,pass:process.env.SMTP_PASS})
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Check if we have credentials (basic check)
    // If not, we log to console (useful for dev) - in real app, might fail or mock.
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("Missing SMTP credentials in env. Logging email instead.");
      console.log(`
        Email from: ${name} <${email}>
        Message: ${message}
      `);
      // Return success simulation for dev
      return NextResponse.json({ success: false, message: "Email logged (no credentials)" });
    }

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address (often must match auth user)
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Receiver address
      replyTo: email, // Valid reply-to address
      subject: `New Contact Form Submission from Portfolio website`,
      text: message,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 15px; border-left: 4px solid #ccc;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
