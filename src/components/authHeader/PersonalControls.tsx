import { useState, useEffect } from "react";
import { Box, Avatar, Badge, Button } from "@mui/material";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "@store/hook";
import { loginUser } from "@store/tutorSlice";
import "./AuthHeader.scss";

const PersonalControls = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [isOpenPersonalMenu, setIsOpenPersonalMenu] = useState(false);

  useEffect(() => {
    setIsOpenPersonalMenu(false);
    // eslint-disable-next-line
  }, [pathname]);

  const handleOpenPersonalMenu = () => {
    setIsOpenPersonalMenu(!isOpenPersonalMenu);
  };

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

  return (
    <Box className="personalControlsBox">
      <Button type="button" className="notificationButton">
        <Badge badgeContent={4} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </Button>
      <Button type="button" className="mailButton">
        <Badge badgeContent={2} color="error">
          <MailOutlineOutlinedIcon />
        </Badge>
      </Button>
      <Button type="button" className="userAvatarButton" onClick={handleOpenPersonalMenu}>
        <Avatar src={user} className="userAvatar" />
      </Button>
      {isOpenPersonalMenu && (
        <Box className="personalMenuBox">
          <NavLink to={"/profile/settings"} className="nav-link">
            {t("generalSettings")}
          </NavLink>
          <NavLink to={"/profile/number"} className="nav-link">
            {t("changePhone")}
          </NavLink>
          <NavLink to={"/profile/language"} className="nav-link">
            {t("languages")}
          </NavLink>
          <NavLink to={"/profile/schedule"} className="nav-link">
            {t("schedule")}
          </NavLink>
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
      )}
    </Box>
  );
};

export default PersonalControls;
