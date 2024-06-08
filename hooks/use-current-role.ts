// client-side hook to get the current user's role

import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user.role;
};
