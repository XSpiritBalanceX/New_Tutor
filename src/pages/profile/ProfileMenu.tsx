import { Box } from "@mui/material";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
//import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import "./ProfilePage.scss";

const ProfileMenu = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  return (
    <Box className="profileMenu">
      <NavLink to={"/profile/settings"} className="nav-link">
        <SettingsOutlinedIcon />
        {t("generalSettings")}
      </NavLink>
      {/* <NavLink to={"/profile/number"} className="nav-link phoneLink">
        <CallOutlinedIcon />
        {t("changeNumber")}
      </NavLink> */}
      {!isStudent && (
        <NavLink to={"/profile/language"} className="nav-link">
          <LanguageOutlinedIcon />
          {t("languages")}
        </NavLink>
      )}
      {!isStudent && (
        <NavLink to={"/profile/schedule"} className="nav-link">
          <CalendarMonthOutlinedIcon />
          {t("schedule")}
        </NavLink>
      )}
      <NavLink to={"/profile/password"} className="nav-link">
        <LockOutlinedIcon />
        {t("changePassword")}
      </NavLink>
      <NavLink to={"/profile/payment"} className="nav-link">
        <ErrorOutlineOutlinedIcon />
        {t("payments")}
      </NavLink>
    </Box>
  );
};

export default ProfileMenu;
