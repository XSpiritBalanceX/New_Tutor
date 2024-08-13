import { Box, Button } from "@mui/material";
import logo from "@assets/whiteLogo.svg";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector } from "@store/hook";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MobileCompanyTeachers from "./MobileCompanyTeachers";
import "./Footer.scss";

const Footer = () => {
  const { t } = translate("translate", { keyPrefix: "footer" });
  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  const aboutCompanyLinks = [
    { label: "aboutUs", path: "/aboutus" },
    { label: "findTutor", path: "/search/1" },
    { label: "askQuestion", path: "/askquestion" },
  ];

  const tutors = {
    firstColumn: [
      { label: "english", path: "/" },
      { label: "spanish", path: "/" },
      { label: "german", path: "/" },
      { label: "chinese", path: "/" },
      { label: "russian", path: "/" },
    ],
    secondColumn: [
      { label: "portuguese", path: "/" },
      { label: "hebrew", path: "/" },
      { label: "japanese", path: "/" },
      { label: "greek", path: "/" },
      { label: "arab", path: "/" },
    ],
  };
  return (
    <Box className="wrapperFooterBox">
      <Box className="footerContainer">
        <Box className="firstRowFooter">
          <img src={logo} alt="logo" />
          <MobileCompanyTeachers />
          <Box className="columnFooter aboutCompanyColumn">
            <p className="titleColumn">{t("aboutCompany")}</p>
            {aboutCompanyLinks.map((el, ind) => (
              <NavLink key={ind} to={el.path} className="nav-link">
                {t(el.label)}
              </NavLink>
            ))}
            {!isLogin && (
              <NavLink to={"/registration"} className="nav-link">
                {t("becomeTeacher")}
              </NavLink>
            )}
          </Box>
          <Box className="columnFooter tutorsColumn">
            <p className="titleColumn">{t("tutors")}</p>
            <Box className="tutorsLinksBox">
              <Box className="columnTutorsBox firstColumnTutorBox">
                {tutors.firstColumn.map((el, ind) => (
                  <NavLink key={ind} to={el.path} className="nav-link">
                    {t(el.label)}
                  </NavLink>
                ))}
              </Box>
              <Box className="columnTutorsBox">
                {tutors.secondColumn.map((el, ind) => (
                  <NavLink key={ind} to={el.path} className="nav-link">
                    {t(el.label)}
                  </NavLink>
                ))}
              </Box>
              <Box className="buttonMoreBox">
                <Button type="button">{t("more")}</Button>
              </Box>
            </Box>
          </Box>
          <Box className="columnFooter">
            <p className="titleColumn">{t("contactUs")}</p>
            <p className="contactInformation">asktutor24@gmail.com</p>
          </Box>
        </Box>
        <Box className="secondRowFooter">
          <Box className="emptyBox" />
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
