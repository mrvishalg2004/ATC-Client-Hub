import type { Client } from "./types";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const notificationRecipient = process.env.NOTIFICATION_EMAIL;
const notificationFrom =
  process.env.NOTIFICATION_FROM_EMAIL ?? "ATC Client Hub <onboarding@resend.dev>";

let resendClient: Resend | null = null;

if (resendApiKey) {
  resendClient = new Resend(resendApiKey);
}

export async function sendSignupNotification(client: Client) {
  if (!resendClient || !notificationRecipient) {
    console.warn("Notification email skipped: missing RESEND_API_KEY or NOTIFICATION_EMAIL env vars.");
    return;
  }

  try {
    await resendClient.emails.send({
      from: notificationFrom,
      to: notificationRecipient,
      subject: "New ATC Client Hub signup",
      text: `A new client just registered on the landing page.\n\nName: ${client.name}\nEmail: ${client.email}\nPhone: ${client.phone}\nProject Type: ${client.projectType}\nBudget: $${client.budget}\nStatus: ${client.status}\nCreated at: ${client.createdAt}`,
      html: `<p>A new client just registered on the landing page.</p>
        <ul>
          <li><strong>Name:</strong> ${client.name}</li>
          <li><strong>Email:</strong> ${client.email}</li>
          <li><strong>Phone:</strong> ${client.phone}</li>
          <li><strong>Project Type:</strong> ${client.projectType}</li>
          <li><strong>Budget:</strong> $${client.budget}</li>
          <li><strong>Status:</strong> ${client.status}</li>
        </ul>
        <p>Created at: ${new Date(client.createdAt).toLocaleString()}</p>`,
    });
  } catch (error) {
    console.error("Failed to send signup notification", error);
  }
}
