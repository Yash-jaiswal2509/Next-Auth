import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const SeverPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo user={user} label="💻Server Component" />
    </div>
  );
};

export default SeverPage;
