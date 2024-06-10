"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // it is made here so that we can do something here from server side before signing out
  // like logging out from other services
  // deleting user etc
  await signOut().then(() => location.reload());
};
