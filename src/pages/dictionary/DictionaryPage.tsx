import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./DictionaryPage.scss";

const DictionaryPage = () => {
  const { t } = translate("translate", { keyPrefix: "dictionaryPage" });

  return (
    <Container className="dictionaryPageContainer">
      <Box className="locationDictionaryPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("dictionary")}</p>
      </Box>
      <p className="titlePage">{t("dictionary")}</p>
    </Container>
  );
};

export default DictionaryPage;
