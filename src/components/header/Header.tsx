import { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@assets/logo.svg";
import { translate } from "@i18n";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector, useAppDispatch } from "@store/hook";
import { changeLocale } from "@store/tutorSlice";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "./MobileMenu";
import "./Header.scss";

const Header = () => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const dispatch = useAppDispatch();

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const { pathname } = useLocation();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    isOpenMenu && setIsOpenMenu(false);
    // eslint-disable-next-line
  }, [pathname]);

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

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <Box className="headerContainer">
      <MobileMenu isOpen={isOpenMenu} cbHandleCloseMenu={handleCloseMenu} />
      <Box className="firstLinksBox">
        <NavLink to={"/"}>
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink to={"/search/1"} className="nav-link findTeacherLink">
          {t("findTeacher")}
        </NavLink>
        <NavLink to={"/registration"} className="nav-link">
          {t("becomeTeacher")}
        </NavLink>
      </Box>
      <Box className="secondLinksBox">
        <TextField select={true} value={locale} onChange={handleChangeLocale} className="languageField">
          {languagesApp.map((el, ind) => (
            <MenuItem key={ind} value={el.value}>
              {el.label}
            </MenuItem>
          ))}
        </TextField>
        <NavLink to={"/login"} className="nav-link loginLink">
          {t("signInButton")}
        </NavLink>
        <NavLink to={"/registration"} className="nav-link registrationLink">
          {t("signUpButton")}
        </NavLink>
        <Button type="button" onClick={handleOpenMenu} className="buttonMobileMenu">
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
