"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
// can be replaced with: server components

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((response) => {
      if (response.status === 200) {
        toast.success("Server Action Success");
      } else {
        toast.error("Server Action Failed");
      }
    });
  };

  const onAPiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("API Route Success");
      } else {
        toast.error("API Route Failed");
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flow-row flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">ADMIN-only API Route</p>
          <Button onClick={onAPiRouteClick}>Click to Test</Button>
        </div>
        <div className="flow-row flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">ADMIN-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
