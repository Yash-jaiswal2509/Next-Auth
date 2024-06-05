"use server";

import { db } from "@/lib/db";
import * as zod from "zod";
import bcrypt from "bcryptjs";
import { ResetPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

export const newPassword = async (
  values: zod.infer<typeof ResetPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing Token" };
  }
  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  const { password } = validatedFields.data!;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Password reset successfully" };
};
