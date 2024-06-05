"use server";

import * as zod from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateResetToken } from "@/lib/tokens";

export const reset = async (values: zod.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.data) {
    return { error: "Invalid Fields" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const passwordResetToken = await generateResetToken(email);

  // send email to user with reset link
  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "Reset password email sent!" };
};
