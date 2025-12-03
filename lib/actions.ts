"use server";

import { randomUUID } from "crypto";
import { type Client } from "./types";
import { getCollection } from "./db";
import { sendSignupNotification } from "./email";
import { contactSchema } from "./schemas";

export type FormState = {
  message: string;
  status: "success" | "error";
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]]?.[0] ?? "Invalid form data.",
      status: "error",
    };
  }
  
  const clientData: Client = {
    id: randomUUID(),
    ...validatedFields.data,
    status: "New",
    createdAt: new Date().toISOString(),
  }

  try {
    const clientsCollection = await getCollection<Client>("clients");
    await clientsCollection.insertOne(clientData);
    await sendSignupNotification(clientData);
  } catch (error) {
    console.error("Failed to persist client submission", error);
    return {
      message: "We couldn't save your request right now. Please try again in a few moments.",
      status: "error",
    };
  }
  
  return {
    message: "Thank you! Your request has been submitted successfully.",
    status: "success",
  };
}
