import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../../../services/requests/role";
import { useAuthContext } from "../../../contexts/auth";
import DataTable from "../../../components/DataTable";
import { IoAccessibilitySharp } from "react-icons/io5";
import { Button } from "@mui/material";

import { useState } from "react";
import UserAccessibilityDialog from "./UserAccessibilityDialog";

export default function Accessability() {
  const [showUserAccessibility, setShowUserAccessibility] = useState(false);
  const [roleRow, setRoleRow] = useState();

  const { token } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await getAllRoles(token),
  });

  const columns = [
    { field: "id", headerName: "شناسه", width: 80 },
    { field: "name", headerName: "نقش", width: 150 },
    { field: "description", headerName: "توضیحات", width: 250 },
    {
      field: "actions",
      headerName: "عملیات",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="info"
              startIcon={<IoAccessibilitySharp />}
              onClick={() => {
                setRoleRow(params.row);
                setShowUserAccessibility(true);
              }}
            >
              مدیریت دسترسی
            </Button>
          </>
        );
      },
    },
  ];

  const getRolePermissionsMutation = useMutation({
    mutationKey: ["role-permissions"],
    mutationFn: async () => getRolePermissions({ token, roleID: role.id }),
  });

  return (
    <>
      <div className="mb-5">
        {data && (
          <DataTable
            columns={columns}
            rows={data.result.roles}
            custom_ID={"id"}
          />
        )}
        <UserAccessibilityDialog
          open={showUserAccessibility}
          onClose={() => setShowUserAccessibility(false)}
          role={roleRow}
        />
      </div>
    </>
  );
}
