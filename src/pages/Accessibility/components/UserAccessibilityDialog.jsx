import { Box, Dialog, DialogContent, useMediaQuery } from "@mui/material";
import DialogHeader from "../../../components/DialogHeader";
import { useTheme } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { getRolePermissions } from "../../../services/requests/permission";
import { useAuthContext } from "../../../contexts/auth";

export default function UserAccessibilityDialog({ open, onClose, role }) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const { token } = useAuthContext();

  const { data, isFetching } = useQuery({
    queryKey: ["role-permissions"],
    queryFn: async () => await getRolePermissions({ token, roleID: role.id }),
    enabled: !!role,
  });

  if (data) {
    console.log(data.result.permissionsRoles);
  }

  return (
    <>
      {role && (
        <Dialog
          fullScreen={isBelowMd}
          open={open}
          onClose={() => onClose()}
          fullWidth
          maxWidth={"xl"}
          sx={{
            "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
          }}
        >
          <DialogHeader
            title={"دسترسی های کاربر"}
            onClose={() => onClose()}
            belowMediaQuery={isBelowMd}
          />
          <DialogContent>
            <Box sx={{ width: "100%" }}>
              {data &&
                data.result.permissionsRoles.map((perm) => perm.permissionName)}
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
