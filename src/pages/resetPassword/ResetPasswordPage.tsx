import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import resetPict from "@assets/resetpasswordpict.svg";
import key1 from "@assets/key1.svg";
import key2 from "@assets/key2.svg";
import lock from "@assets/lockopen.svg";
import { useLocation } from "react-router-dom";
import "./ResetPasswordPage.scss";

const ResetPasswordPage = () => {
  const { t } = translate("translate", { keyPrefix: "resetPasswordPage" });
  return (
    <Container className="resetPasswordContainer">
      <Box className="mainPictureResetBox">
        <img src={resetPict} alt="reset password" />
      </Box>
      <Box className="contentResetBox">
        <img src={lock} alt="lock" className="firstPictReset" />
        <img src={key1} alt="key" className="secondPictReset" />
        <img src={key2} alt="key" className="thirdPictReset" />
        <Box className="formContainer"></Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
