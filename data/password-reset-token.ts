import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    console.log(resetToken);
    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.passwordResetToken.findFirst({
      where: { token },
    });

    return resetToken;
  } catch (error) {
    return null;
  }
};
