import { db } from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFatorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFatorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFatorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFatorToken;
  } catch (error) {
    return null;
  }
};
