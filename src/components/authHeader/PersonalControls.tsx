import { useState, useEffect } from "react";
import { Box, Avatar, Badge, Button } from "@mui/material";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { loginUser, changeOpenChat, setOpponentId } from "@store/tutorSlice";
import * as tutorSelectors from "@store/selectors";
import UserNotifications from "@components/userNotifications/UserNotifications";
import MenuIcon from "@mui/icons-material/Menu";
import MobileAuthMenu from "./MobileAuthMenu";
import MobilePersonalMenu from "./MobilePersonalMenu";
import { USER_TYPE, TOKEN_KEY } from "@utils/appConsts";
import { ChatList, LS_TOKEN_KEY } from "chat-frontend-library";
import { AxiosError } from "axios";
import { refreshToken } from "@api/auth/refreshToken";
import { LS_WEBRTK_TOKEN_KEY } from "webrtc-frontend-library";
import "animate.css";
import "./AuthHeader.scss";

const PersonalControls = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [isOpenPersonalMenu, setIsOpenPersonalMenu] = useState(false);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);
  const [isOpenChatList, setIsOpenChatList] = useState(false);

  useEffect(() => {
    isOpenPersonalMenu && setIsOpenPersonalMenu(false);
    isOpenNotifications && setIsOpenNotifications(false);
    isOpenMenuMobile && setIsOpenMenuMobile(false);
    isOpenChatList && setIsOpenChatList(false);
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    if (isOpenChatList || isOpenNotifications) {
      body.classList.add("stopScroll");
    } else {
      body.classList.remove("stopScroll");
    }
    // eslint-disable-next-line
  }, [isOpenChatList, isOpenNotifications]);

  const handleOpenPersonalMenu = () => {
    setIsOpenPersonalMenu(!isOpenPersonalMenu);
    if (!isOpenPersonalMenu) {
      isOpenChatList && setIsOpenChatList(false);
      isOpenNotifications && setIsOpenNotifications(false);
    }
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
    isOpenChatList && setIsOpenChatList(false);
    isOpenPersonalMenu && setIsOpenPersonalMenu(false);
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

  const handleOpenChatList = () => {
    setIsOpenChatList(true);
    isOpenNotifications && setIsOpenNotifications(false);
    isOpenPersonalMenu && setIsOpenPersonalMenu(false);
  };

  const handleCloseChatList = () => {
    setIsOpenChatList(false);
  };

  const handleRefreshToken = async (err: AxiosError) => {
    if (err.response?.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(LS_TOKEN_KEY, newToken);
        localStorage.setItem(LS_WEBRTK_TOKEN_KEY, newToken);
      }
      return newToken;
    }
  };

  const handleOpenChat = (chatInformation: { chat_id: string; opponent_id: string }) => {
    dispatch(setOpponentId(chatInformation.opponent_id));
    dispatch(changeOpenChat(true));
    setIsOpenChatList(false);
  };

  return (
    <Box className="personalControlsBox">
      <Button type="button" className="notificationButton" onClick={handleOpenNotifications}>
        <Badge badgeContent={4} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </Button>
      {isOpenNotifications && <UserNotifications cbHandleCloseNotification={handleCloseNotifications} />}
      <Button type="button" className="mailButton" onClick={handleOpenChatList}>
        <Badge badgeContent={2} color="error">
          <MailOutlineOutlinedIcon />
        </Badge>
      </Button>
      {isOpenChatList && (
        <Box className="tutorChatListWrapper animate__animated animate__slideInRight">
          <ChatList
            user_locale={locale}
            isOnlyChatList={true}
            cbHandleCloseChatList={handleCloseChatList}
            handleRefreshToken={handleRefreshToken}
            classList="tutorChatList"
            cbHandleOpenChat={handleOpenChat}
          />
        </Box>
      )}
      <Button type="button" className="userAvatarButton" onClick={handleOpenPersonalMenu}>
        <Avatar src={user} className="userAvatar" />
      </Button>
      <Button type="button" onClick={handleOpenMenuMobile} className="buttonMenuMobile">
        <MenuIcon />
      </Button>
      <MobileAuthMenu isOpen={isOpenMenuMobile} cbHandleCloseMenu={handleCloseMenuMobile} />
      <MobilePersonalMenu isOpen={isOpenPersonalMenu} cbHandleCloseMenu={handleOpenPersonalMenu} />
      {isOpenPersonalMenu && (
        <Box className="personalMenuBox animate__animated animate__slideInRight">
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
          <Box onClick={handleLogOut} className="logOutBox">
            {t("logOut")}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PersonalControls;
