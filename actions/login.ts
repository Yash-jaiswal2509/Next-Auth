"use server";

import * as zod from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  return { success: "Email Sent" };
};
