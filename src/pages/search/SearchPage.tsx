import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./SearchPage.scss";

const SearchPage = () => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  return (
    <Container className="searchPageContainer">
      <Box className="locationSearchPageBox">
        <NavLink to={"/"} className={"mainLink"}>
          {t("main")}
        </NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p className="findTeacher">{t("findTeacher")}</p>
      </Box>
      <p className="findTeacherTitle">{t("findTeacher")}</p>
    </Container>
  );
};

export default SearchPage;
