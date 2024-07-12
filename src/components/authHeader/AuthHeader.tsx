import { useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "@assets/logo.svg";
import { translate } from "@i18n";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector, useAppDispatch } from "@store/hook";
import { changeLocale } from "@store/tutorSlice";
import Balance from "./Balance";
import classNames from "classnames";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonalControls from "./PersonalControls";
import "./AuthHeader.scss";

const AuthHeader = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const [isOpenLessonMenu, setIsOpenLessonMenu] = useState(false);

  const dispatch = useAppDispatch();

  const locale = useAppSelector(tutorSelectors.localeSelect);

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

  const handleOpenMenuLessons = () => {
    setIsOpenLessonMenu(!isOpenLessonMenu);
  };

  const classBoxButtonLesson: string = classNames("buttonLesson", {
    openMenu: isOpenLessonMenu,
  });

  return (
    <Box className="authHeaderContainer">
      <Box className="firstColHeader">
        <NavLink to={"/"}>
          <img src={logo} alt="logo" />
        </NavLink>
        <Box className="balanceLinksBox">
          <Balance />
          <Box className="linksAuthHeaderBox">
            <Button type="button" onClick={handleOpenMenuLessons} className={classBoxButtonLesson}>
              {t("myLessons")}
              <ExpandMoreIcon />
            </Button>
            {isOpenLessonMenu && (
              <Box className="menuLessonsBox">
                <NavLink to={"/lessons/1"}>{t("allLessons")}</NavLink>
                <NavLink to={"/"}>{t("videoLesson")}</NavLink>
              </Box>
            )}
            <NavLink to={"/search/1"} className="nav-link">
              {t("findTeacher")}
            </NavLink>
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
  );
};

export default AuthHeader;
