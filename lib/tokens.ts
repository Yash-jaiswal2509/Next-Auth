import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  console.log(existingToken);
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
