import { useState, useEffect } from "react";
import { Box, Avatar, Badge, Button } from "@mui/material";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "@store/hook";
import { loginUser } from "@store/tutorSlice";
import UserNotifications from "@components/userNotifications/UserNotifications";
import MenuIcon from "@mui/icons-material/Menu";
import MobileAuthMenu from "./MobileAuthMenu";
import MobilePersonalMenu from "./MobilePersonalMenu";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import "./AuthHeader.scss";

const PersonalControls = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [isOpenPersonalMenu, setIsOpenPersonalMenu] = useState(false);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);

  useEffect(() => {
    isOpenPersonalMenu && setIsOpenPersonalMenu(false);
    isOpenNotifications && setIsOpenNotifications(false);
    isOpenMenuMobile && setIsOpenMenuMobile(false);
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

  const handleOpenNotifications = () => {
    setIsOpenNotifications(true);
  };

  const handleCloseNotifications = () => {
    setIsOpenNotifications(false);
  };

  const handleOpenMenuMobile = () => {
    setIsOpenMenuMobile(true);
  };

  const handleCloseMenuMobile = () => {
    setIsOpenMenuMobile(false);
  };

  return (
    <Box className="personalControlsBox">
      <Button type="button" className="notificationButton" onClick={handleOpenNotifications}>
        <Badge badgeContent={4} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </Button>
      {isOpenNotifications && <UserNotifications cbHandleCloseNotification={handleCloseNotifications} />}
      <Button type="button" className="mailButton">
        <Badge badgeContent={2} color="error">
          <MailOutlineOutlinedIcon />
        </Badge>
      </Button>
      <Button type="button" className="userAvatarButton" onClick={handleOpenPersonalMenu}>
        <Avatar src={user} className="userAvatar" />
      </Button>
      <Button type="button" onClick={handleOpenMenuMobile} className="buttonMenuMobile">
        <MenuIcon />
      </Button>
      <MobileAuthMenu isOpen={isOpenMenuMobile} cbHandleCloseMenu={handleCloseMenuMobile} />
      <MobilePersonalMenu isOpen={isOpenPersonalMenu} cbHandleCloseMenu={handleOpenPersonalMenu} />
      {isOpenPersonalMenu && (
        <Box className="personalMenuBox">
          <NavLink to={"/profile/settings"} className="nav-link">
            {t("generalSettings")}
          </NavLink>
          {/*  <NavLink to={"/profile/number"} className="nav-link">
            {t("changePhone")}
          </NavLink> */}
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
      )}
    </Box>
  );
};

export default PersonalControls;
