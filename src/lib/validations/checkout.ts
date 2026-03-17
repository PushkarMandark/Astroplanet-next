import { z } from "zod";

export const checkoutSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postcode: z
        .string()
        .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
    notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
