import { useState } from "react";
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Button } from "@mui/material";
import { translate } from "@i18n";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector } from "@store/hook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const MobileCompanyTeachers = () => {
  const { t } = translate("translate", { keyPrefix: "footer" });

  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

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
    <Box className="mobileCompanyTeachersBox">
      <Accordion expanded={expanded} onChange={handleExpansion} className="itemAccordionMobile">
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="itemAccordionSumMobile">
          <Typography>{t("aboutCompany")}</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionMobileDetailsCompany">
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
        </AccordionDetails>
      </Accordion>
      <Accordion className="itemAccordionMobile">
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="itemAccordionSumMobile">
          <Typography>{t("tutors")}</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionMobileDetailsTeachers">
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
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MobileCompanyTeachers;
