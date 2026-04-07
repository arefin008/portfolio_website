import { z } from "zod";

const nameBlockedCharacters = /[<>{}[\]\\`$%^*_+=|~]/u;
const phoneCharactersPattern =
  /^[+]?[\d\s()./-]*(?:\s?(?:ext\.?|extension|x|#)\s?\d{1,10})?$/iu;
const phoneExtensionPattern = /\s*(?:ext\.?|extension|x|#)\s?\d{1,10}$/iu;

function hasLetter(value: string) {
  return /[\p{L}\p{M}]/u.test(value);
}

function getPhoneDigits(value: string) {
  return value.replace(phoneExtensionPattern, "").replace(/\D/g, "");
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(120, "Name must be 120 characters or fewer.")
    .refine((value) => hasLetter(value), "Please enter a valid name.")
    .refine(
      (value) => !nameBlockedCharacters.test(value),
      "Name contains unsupported characters.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone must be 40 characters or fewer.")
    .refine(
      (value) => value === "" || phoneCharactersPattern.test(value),
      "Please enter a valid phone number.",
    )
    .refine((value) => {
      if (value === "") {
        return true;
      }

      const digits = getPhoneDigits(value);
      return digits.length >= 6 && digits.length <= 15;
    }, "Phone number must include 6 to 15 digits.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(4000, "Message must be 4000 characters or fewer."),
  website: z
    .string()
    .trim()
    .max(200, "Invalid submission.")
    .optional()
    .or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
