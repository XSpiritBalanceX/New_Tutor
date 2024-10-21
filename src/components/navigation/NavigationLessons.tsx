import { Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { translate } from "@i18n";
import "./Navigation.scss";

const NavigationLessons = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { pathname } = useLocation();

  return (
    <Box className="navigationLessonsBox">
      <p className="titleAllLessons">{t("myLessons")}</p>
      <Box className="lessonsLinksBox">
        <NavLink
          to={"/lessons/upcoming/1"}
          className={({ isActive }) =>
            isActive || pathname.startsWith("/lessons/upcoming") ? "nav-link active" : "nav-link"
          }
        >
          {t("upcomingLessons")}
        </NavLink>
        <NavLink
          to={"/lessons/past/1"}
          className={({ isActive }) =>
            isActive || pathname.startsWith("/lessons/past") ? "nav-link active" : "nav-link"
          }
        >
          {t("pastLessons")}
        </NavLink>
        <NavLink
          to={"/lessons/canceled/1"}
          className={({ isActive }) =>
            isActive || pathname.startsWith("/lessons/canceled") ? "nav-link active" : "nav-link"
          }
        >
          {t("canceledLessons")}
        </NavLink>
      </Box>
    </Box>
  );
};

export default NavigationLessons;
