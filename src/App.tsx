import { useEffect } from "react";
import { Box } from "@mui/material";
import ScrollToTop from "@components/scrollToTop/ScrollToTop";
import RouterComponent from "@components/router/RouterComponent";
import { ToastContainer, Zoom } from "react-toastify";
import { useAppSelector, useAppDispatch } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { loginUser, changeOpenChat } from "@store/tutorSlice";
import { translate } from "@i18n";
import WrapperHeader from "@components/header/WrapperHeader";
import Footer from "@components/footer/Footer";
import moment from "moment";
import { axiosAPI } from "@axiosApi/axiosAPI";
import ErrorBoundary from "@components/error/ErrorBoundary";
import CookiesModal from "@components/modal/CookiesModal";
import { Chat, LS_TOKEN_KEY } from "chat-frontend-library";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { TOKEN_KEY } from "@utils/appConsts";
import { LS_WEBRTK_TOKEN_KEY } from "webrtc-frontend-library";
import { refreshToken } from "@api/auth/refreshToken";
import "moment/locale/ru";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "./index.scss";

axiosAPI.setGetItem((key) => localStorage.getItem(key));
axiosAPI.setSetItem((key, value) => localStorage.setItem(key, value));

const App = () => {
  const { i18n } = translate();

  const locale = useAppSelector(tutorSelectors.localeSelect);
  const currentOpponentId = useAppSelector(tutorSelectors.currentOpponentIDSelect);
  const isOpenChat = useAppSelector(tutorSelectors.isOpenChatSelect);

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  moment.locale(locale);

  useEffect(() => {
    i18n.changeLanguage(locale);
    // eslint-disable-next-line
  }, [locale]);

  useEffect(() => {
    axiosAPI.setLogout(() =>
      dispatch(
        loginUser({
          isLogin: false,
          token: "",
          refreshToken: "",
          expiresIn: 0,
          user_type: 0,
          register_state: "",
        }),
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const body = document.body;
    if (isOpenChat) {
      body.classList.add("stopScroll");
    } else {
      body.classList.remove("stopScroll");
    }
    // eslint-disable-next-line
  }, [isOpenChat]);

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

  const handleCloseChat = () => {
    dispatch(changeOpenChat(false));
  };

  const routesWithFooter = [
    "/login",
    "/registration",
    "/search",
    "/teacher",
    "/student",
    "/",
    "/invitation",
    "/forgotpassword",
    "/resetpassword",
    "/aboutus",
    "/askquestion",
    "/terms",
    "/policy",
  ];

  const shouldDisplayFooter = (path: string) => {
    if (routesWithFooter.includes(path)) {
      return true;
    }

    const dynamicRoutes = [/^\/search\/\d+$/, /^\/teacher\/\d+$/, /^\/student\/\d+$/];
    return dynamicRoutes.some((route) => route.test(path));
  };

  return (
    <ErrorBoundary>
      <Box position={"relative"}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="light"
          className={"notificationToast"}
          toastClassName={"toastBody"}
          progressClassName={"toastProgress"}
          transition={Zoom}
        />
        <ScrollToTop />
        <WrapperHeader />
        <Box className={`${isOpenChat && pathname.includes("video_lesson") ? "wrappedBox" : ""}`}>
          <RouterComponent />
          {isOpenChat && (
            <Box className="tutorChatBox animate__animated animate__slideInUp">
              <Chat
                opponent_id={currentOpponentId}
                user_locale={locale}
                isOnlyChat={true}
                cbHandleCloseChat={handleCloseChat}
                handleRefreshToken={handleRefreshToken}
                classHeader="tutorChatHeader"
                classMessages="tutorChatMessages"
              />
            </Box>
          )}
        </Box>
        <CookiesModal />
      </Box>
      {shouldDisplayFooter(pathname) && <Footer />}
    </ErrorBoundary>
  );
};

export default App;
