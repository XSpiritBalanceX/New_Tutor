import { Container, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { translate } from "@i18n";
import mainPicture from "@assets/mainPicture.svg";
import SignInForm from "@components/signIn/SignInForm";
import SignUpForm from "@components/signUp/SignUpForm";
import "./AuthPage.scss";

const AuthPage = () => {
  const { t } = translate("translate", { keyPrefix: "authPage" });

  const { pathname } = useLocation();

  return (
    <Container className="containerAuthPage">
      <Box className="titleBox">
        <p className="title">
          <span>TUTOR</span> &mdash; {t("title")}
        </p>
        <p className="firstTag">{t("taglineOne")}</p>
        <p className="secondTag">{t("taglineTwo")}</p>
        <img src={mainPicture} alt="main" />
      </Box>
      <Box className="formsBox">
        {pathname === "/login" && <SignInForm />}
        {pathname === "/registration" && <SignUpForm />}
      </Box>
    </Container>
  );
};

export default AuthPage;
