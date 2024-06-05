import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verficationToKen.findFirst({
      where: { email },
    });
    console.log(verificationToken);
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verficationToKen.findFirst({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
