import { Box, Drawer, Button } from "@mui/material";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./Header.scss";

interface IMobileMenuProps {
  isOpen: boolean;
  cbHandleCloseMenu: () => void;
}

const MobileMenu = ({ isOpen, cbHandleCloseMenu }: IMobileMenuProps) => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const handleCloseMenu = () => {
    cbHandleCloseMenu();
  };
  return (
    <Drawer open={isOpen} anchor="right" className="mobileMenuHeaderContainer" onClose={handleCloseMenu}>
      <Box className="closeButtonBox">
        <Button type="button" onClick={handleCloseMenu}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <NavLink to={"/search/1"} className="nav-link findTeacherLink">
        {t("findTeacher")}
      </NavLink>
      <NavLink to={"/registration"} className="nav-link">
        {t("becomeTeacher")}
      </NavLink>
    </Drawer>
  );
};

export default MobileMenu;
