import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import * as z from "zod";
import { getEnv } from "@/lib/env";

export const prerender = false;

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate request body
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return json({ error: "Invalid input", details: parsed.error.issues }, 400);
    }

    const { name, email, message } = parsed.data;

    const smtpUser = getEnv("SMTP_USER");
    const smtpPass = getEnv("SMTP_PASS");

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: getEnv("SMTP_HOST") || "smtp.gmail.com",
      port: Number(getEnv("SMTP_PORT")) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Without credentials, log instead of sending (same as the original)
    if (!smtpUser || !smtpPass) {
      console.warn("Missing SMTP credentials in env. Logging email instead.");
      return json({ success: false, message: "Email logged (no credentials)" });
    }

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${smtpUser}>`, // Sender address (often must match auth user)
      to: getEnv("CONTACT_EMAIL") || smtpUser, // Receiver address
      replyTo: email,
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

    return json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return json({ error: "Failed to send email" }, 500);
  }
};
