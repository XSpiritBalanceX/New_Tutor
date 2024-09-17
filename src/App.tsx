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
import "moment/locale/ru";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

axiosAPI.setGetItem((key) => localStorage.getItem(key));
axiosAPI.setSetItem((key, value) => localStorage.setItem(key, value));

const mockChatToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NjU3MjUyLCJpYXQiOjE3MjY1NzA4NTIsImp0aSI6IjdlMGY2MDc0MzQ3NzQ3NWRiOTMzYjNhNWNkZGJlY2RkIiwidXNlcl9pZCI6ImYxOGQzZGRmLTllZDgtNGNiMi1hZDYyLThmNzk1Y2FhZThhMCJ9.-vHUrQj2ZaFL6nlBuumXK6V25piFZX1ylo0Fp5QZCIk";

const App = () => {
  const { i18n } = translate();

  const locale = useAppSelector(tutorSelectors.localeSelect);
  const currentOpponentId = useAppSelector(tutorSelectors.currentOpponentIDSelect);
  const isOpenChat = useAppSelector(tutorSelectors.isOpenChatSelect);

  const dispatch = useAppDispatch();

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
    console.log("ERR CHAT HERE", err.response?.status);
    if (err.response?.status === 401) {
      console.log("Token is expired, refreshing...");
      const newToken = await new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem(LS_TOKEN_KEY, mockChatToken);
          resolve(mockChatToken);
        }, 5000);
      });
      console.log("New token received:", newToken);
      return newToken;
    }
  };

  const handleCloseChat = () => {
    dispatch(changeOpenChat(false));
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
        <RouterComponent />
        {isOpenChat && (
          <Box className="tutorChatBox">
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
        <CookiesModal />
      </Box>
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
