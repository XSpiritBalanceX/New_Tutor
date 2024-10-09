import { translate } from "@i18n";
import { Box } from "@mui/material";
import { useParams, useLocation, NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { capitalizeFirstLetter } from "@utils/dictionaryFunctions";
import "./DictionaryPage.scss";

const DictionaryNavigation = () => {
  const { t } = translate("translate", { keyPrefix: "dictionaryPage" });

  const { name_folder } = useParams();
  const { pathname } = useLocation();

  return (
    <Box className="navigationContainer">
      {pathname === "/dictionary" && (
        <Box className="locationDictionaryPage">
          <NavLink to={"/"} className={"link"}>
            {t("main")}
          </NavLink>
          <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
          <p className="location">{t("dictionary")}</p>
        </Box>
      )}
      {name_folder && (
        <Box className="locationDictionaryPage">
          <NavLink to={"/"} className={"link"}>
            {t("main")}
          </NavLink>
          <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
          <NavLink to={"/dictionary"} className={"link"}>
            {t("dictionary")}
          </NavLink>
          <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
          <p className="location">
            {name_folder === "all_words"
              ? t("allWords")
              : name_folder === "favorites"
              ? t("favorites")
              : capitalizeFirstLetter(name_folder)}
          </p>
        </Box>
      )}
      {(pathname === "/dictionary/new_word" || pathname === "/dictionary/new_folder") && (
        <Box className="locationDictionaryPage">
          <NavLink to={"/"} className={"link"}>
            {t("main")}
          </NavLink>
          <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
          <NavLink to={"/dictionary"} className={"link"}>
            {t("dictionary")}
          </NavLink>
          <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
          <p className="location">{pathname === "/dictionary/new_word" ? t("addNewWord") : t("addNewFolder")}</p>
        </Box>
      )}
    </Box>
  );
};

export default DictionaryNavigation;
