import { db } from "./db";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 300 * 1000);// 5min

  const existingToken = await getVerificationTokenByEmail(email);
  // console.log(existingToken);
  if (existingToken) {
    await db.verficationToKen.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToKen = await db.verficationToKen.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToKen;
};

export const generateResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 300 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  console.log(existingToken);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 300 * 1000); // 1000 is for ms(mili-second)

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
