import { z } from "zod";
import { projectTypes } from "./types";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  projectType: z.enum(projectTypes),
  budget: z.coerce.number().min(0, { message: "Budget must be a positive number." }),
});
