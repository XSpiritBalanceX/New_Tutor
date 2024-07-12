import { useEffect } from "react";
import ScrollToTop from "@components/scrollToTop/ScrollToTop";
import RouterComponent from "@components/router/RouterComponent";
import { ToastContainer, Zoom } from "react-toastify";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { translate } from "@i18n";
import WrapperHeader from "@components/header/WrapperHeader";
import Footer from "@components/footer/Footer";
import moment from "moment";
import "moment/locale/ru";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const locale = useAppSelector(tutorSelectors.localeSelect);
  const { i18n } = translate();

  moment.locale(locale);

  useEffect(() => {
    i18n.changeLanguage(locale);
    // eslint-disable-next-line
  }, [locale]);

  return (
    <>
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
    </>
  );
};

export default App;
