import { Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./Navigation.scss";

const NavigationLessons = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { pathname } = useLocation();

  return (
    <Box className="navigationLessonsBox">
      <Box className="locationAllLessons">
        <NavLink to={"/"} className={"mainLink"}>
          {t("main")}
        </NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p className="myLessons">{t("myLessons")}</p>
      </Box>
      <p className="titleAllLessons">{t("myLessons")}</p>
      <Box className="lessonsLinksBox">
        <NavLink
          to={"/upcoming_lessons/1"}
          className={({ isActive }) =>
            isActive || pathname.startsWith("/upcoming_lessons") ? "nav-link active" : "nav-link"
          }
        >
          {t("upcomingLessons")}
        </NavLink>
        <NavLink
          to={"/past_lessons/1"}
          className={({ isActive }) =>
            isActive || pathname.startsWith("/past_lessons") ? "nav-link active" : "nav-link"
          }
        >
          {t("pastLessons")}
        </NavLink>
      </Box>
    </Box>
  );
};

export default NavigationLessons;
