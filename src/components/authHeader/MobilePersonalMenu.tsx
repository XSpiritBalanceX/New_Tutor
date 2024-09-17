import { Box, Drawer, Button } from "@mui/material";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppDispatch } from "@store/hook";
import { loginUser } from "@store/tutorSlice";
import { USER_TYPE } from "@utils/appConsts";
import "./AuthHeader.scss";

interface IMobilePersonalMenuProps {
  isOpen: boolean;
  cbHandleCloseMenu: () => void;
}

const MobilePersonalMenu = ({ isOpen, cbHandleCloseMenu }: IMobilePersonalMenuProps) => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(
      loginUser({
        isLogin: false,
        token: "",
        refreshToken: "",
        expiresIn: 0,
        user_type: 0,
        register_state: "",
      }),
    );
  };

  const handleCloseMenu = () => {
    cbHandleCloseMenu();
  };

  return (
    <Drawer open={isOpen} anchor="right" className="mobilePersonalMenuContainer" onClose={handleCloseMenu}>
      <Box className="closeButtonBox">
        <Button type="button" onClick={handleCloseMenu}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <Box className="personalMenuBox">
        <NavLink to={"/profile/settings"} className="nav-link">
          {t("generalSettings")}
        </NavLink>
        <NavLink to={"/profile/number"} className="nav-link">
          {t("changePhone")}
        </NavLink>
        {!isStudent && (
          <NavLink to={"/profile/language"} className="nav-link">
            {t("languages")}
          </NavLink>
        )}
        {!isStudent && (
          <NavLink to={"/profile/schedule"} className="nav-link">
            {t("schedule")}
          </NavLink>
        )}
        <NavLink to={"/profile/password"} className="nav-link">
          {t("changePassword")}
        </NavLink>
        <NavLink to={"/profile/payment"} className="nav-link">
          {t("payments")}
        </NavLink>
        <Button type="button" onClick={handleLogOut} className="logOutButton">
          {t("logOut")}
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobilePersonalMenu;
