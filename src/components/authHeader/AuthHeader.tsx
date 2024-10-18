import { useState, useEffect } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@assets/logo.svg";
import { translate } from "@i18n";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector, useAppDispatch } from "@store/hook";
import { changeLocale } from "@store/tutorSlice";
import Balance from "./Balance";
import PersonalControls from "./PersonalControls";
import { USER_TYPE } from "@utils/appConsts";
import { useGetProfileQuery } from "@store/requestApi/profileApi";
import Loader from "@components/loader/Loader";
import "./AuthHeader.scss";

const AuthHeader = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const [isOpenLessonMenu, setIsOpenLessonMenu] = useState(false);

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    isOpenLessonMenu && setIsOpenLessonMenu(false);
    // eslint-disable-next-line
  }, [pathname]);

  const locale = useAppSelector(tutorSelectors.localeSelect);
  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const { isLoading } = useGetProfileQuery({ isStudent });

  const languagesApp = [
    {
      label: "RU",
      value: "ru",
    },
    {
      label: "EN",
      value: "en",
    },
  ];

  const handleChangeLocale = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLocale(e.target.value));
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box className="authHeaderContainer">
        <Box className="firstColHeader">
          <NavLink to={"/"} className={"logoLink"}>
            <img src={logo} alt="logo" />
          </NavLink>
          <Box className="balanceLinksBox">
            <Balance />
            <Box className="linksAuthHeaderBox">
              <NavLink to={"/lessons/upcoming/1"} className="nav-link">
                {t("myLessons")}
              </NavLink>
              {isStudent && (
                <>
                  <NavLink to={"/dictionary"} className="nav-link">
                    {t("dictionary")}
                  </NavLink>
                  <NavLink to={"/search/1"} className="nav-link">
                    {t("findTeacher")}
                  </NavLink>
                </>
              )}
              <NavLink to={"/invitation"} className="nav-link">
                {t("inviteFriend")}
              </NavLink>
            </Box>
          </Box>
        </Box>
        <Box className="secondColHeader">
          <TextField select={true} value={locale} onChange={handleChangeLocale} className="languageField">
            {languagesApp.map((el, ind) => (
              <MenuItem key={ind} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </TextField>
          <PersonalControls />
        </Box>
      </Box>
    </>
  );
};

export default AuthHeader;
