// client-side hook to get the current user from the session
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  return session?.data?.user;
};
