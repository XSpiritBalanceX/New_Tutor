import { useState } from "react";
import { Box, Avatar, Badge, Button } from "@mui/material";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { NavLink } from "react-router-dom";
import "./AuthHeader.scss";

const PersonalControls = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const [isOpenPersonalMenu, setIsOpenPersonalMenu] = useState(false);

  const handleOpenPersonalMenu = () => {
    setIsOpenPersonalMenu(!isOpenPersonalMenu);
  };

  const handleLogOut = () => {
    console.log("log out");
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
          <NavLink to={"/user/setting"} className="nav-link">
            {t("generalSettings")}
          </NavLink>
          <NavLink to={"/user/number"} className="nav-link">
            {t("changePhone")}
          </NavLink>
          <NavLink to={"/user/language"} className="nav-link">
            {t("languages")}
          </NavLink>
          <NavLink to={"/user/schedule"} className="nav-link">
            {t("schedule")}
          </NavLink>
          <NavLink to={"/user/password"} className="nav-link">
            {t("changePassword")}
          </NavLink>
          <NavLink to={"/user/payment"} className="nav-link">
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
