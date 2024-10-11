import { useState } from "react";
import {
  Box,
  Drawer,
  Button,
  TextField,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector, useAppDispatch } from "@store/hook";
import { changeLocale } from "@store/tutorSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Balance from "./Balance";
import { USER_TYPE } from "@utils/appConsts";
import "./AuthHeader.scss";

interface IMobileAuthMenuProps {
  isOpen: boolean;
  cbHandleCloseMenu: () => void;
}

const MobileAuthMenu = ({ isOpen, cbHandleCloseMenu }: IMobileAuthMenuProps) => {
  const { t } = translate("translate", { keyPrefix: "header" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const dispatch = useAppDispatch();
  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleCloseMenu = () => {
    cbHandleCloseMenu();
  };

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
    <Drawer open={isOpen} anchor="right" className="mobileMenuAuthHeaderContainer" onClose={handleCloseMenu}>
      <Box className="closeButtonBox">
        <TextField select={true} value={locale} onChange={handleChangeLocale} className="languageField">
          {languagesApp.map((el, ind) => (
            <MenuItem key={ind} value={el.value}>
              {el.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="button" onClick={handleCloseMenu}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <Accordion expanded={expanded} onChange={handleExpansion} className="itemAccordionMobileHeader">
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="itemAccordionSumMobileHeader">
          <Typography>{t("balanceMobile")}</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionMobileDetailsBalance">
          <Balance />
        </AccordionDetails>
      </Accordion>
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
      <NavLink to={"/lessons/1"} className="nav-link">
        {t("myLessons")}
      </NavLink>
      <NavLink to={"/invitation"} className="nav-link">
        {t("inviteFriend")}
      </NavLink>
    </Drawer>
  );
};

export default MobileAuthMenu;
