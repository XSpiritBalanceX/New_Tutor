import { useEffect } from "react";
import ScrollToTop from "@components/scrollToTop/ScrollToTop";
import RouterComponent from "@components/router/RouterComponent";
import { ToastContainer, Zoom } from "react-toastify";
import { useAppSelector, useAppDispatch } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { loginUser } from "@store/tutorSlice";
import { translate } from "@i18n";
import WrapperHeader from "@components/header/WrapperHeader";
import Footer from "@components/footer/Footer";
import moment from "moment";
import { axiosAPI } from "@axiosApi/axiosAPI";
import ErrorBoundary from "@components/error/ErrorBoundary";
import "moment/locale/ru";
import "react-toastify/dist/ReactToastify.css";

axiosAPI.setGetItem((key) => localStorage.getItem(key));
axiosAPI.setSetItem((key, value) => localStorage.setItem(key, value));

const App = () => {
  const locale = useAppSelector(tutorSelectors.localeSelect);
  const { i18n } = translate();

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

  return (
    <ErrorBoundary>
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
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
