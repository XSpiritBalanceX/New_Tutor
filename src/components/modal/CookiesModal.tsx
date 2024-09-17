import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { translate } from "@i18n";
import Cookies from "js-cookie";
import "./Modal.scss";

const CookiesModal = () => {
  const { t } = translate("translate", { keyPrefix: "notification.cookies" });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    consent && setIsVisible(false);
    !consent && setIsVisible(true);
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 7 });
    setIsVisible(false);
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 7 });
    setIsVisible(false);
  };

  return isVisible ? (
    <Box className="cookiesModalBox">
      <Box className="textBox">
        <p>
          {t("text")} <NavLink to={"/policy"}>{t("link")}</NavLink>
        </p>
      </Box>
      <Box className="buttonsBox">
        <Button className="acceptButton" onClick={handleAccept}>
          {t("acceptAll")}
        </Button>
        <Button className="rejectButton" onClick={handleReject}>
          {t("rejectAll")}
        </Button>
      </Box>
    </Box>
  ) : null;
};

export default CookiesModal;
