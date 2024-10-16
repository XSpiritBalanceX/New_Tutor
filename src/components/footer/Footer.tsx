import { Box } from "@mui/material";
import logo from "@assets/whiteLogo.svg";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector } from "@store/hook";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "./Footer.scss";

const Footer = () => {
  const { t } = translate("translate", { keyPrefix: "footer" });
  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  const aboutCompanyLinks = [
    { label: "aboutUs", path: "/aboutus" },
    { label: "askQuestion", path: "/askquestion" },
  ];

  return (
    <Box className="wrapperFooterBox">
      <Box className="footerContentBox">
        <NavLink to={"/"} className={"logoLink"}>
          <img src={logo} alt="logo" />
        </NavLink>
        <Box className="footerColumnBox">
          {aboutCompanyLinks.map((el, ind) => (
            <NavLink key={ind} to={el.path} className="nav-link">
              {t(el.label)}
            </NavLink>
          ))}
          {isLogin && (
            <NavLink to={"/invitation"} className={"logoLink"}>
              {t("inviteFriend")}
            </NavLink>
          )}
        </Box>
        <Box className="footerColumnBox">
          <p className="titleColumn">{t("contactUs")}</p>
          <p className="contactInformation">asktutor24@gmail.com</p>
        </Box>
        <Box className="footerColumnBox policyTermsBox">
          <NavLink to={"/terms"} className="nav-link">
            {t("termsOfUs")}
          </NavLink>
          <NavLink to={"/policy"} className="nav-link">
            {t("privacyPolicy")}
          </NavLink>
          <p className="copyInformation">
            <CopyrightIcon /> 2021–2022 All rights reserved
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
