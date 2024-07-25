import { useState } from "react";
import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { NavLink, useParams } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useGetTeachersListQuery } from "@store/requestApi/searchApi";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import SearchFilter from "@components/searchFilter/SearchFilter";
import "./SearchPage.scss";

const SearchPage = () => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  const { page } = useParams();

  const [itemPerPage] = useState(4);

  const { data, isLoading, error } = useGetTeachersListQuery({
    currentPage: page as string,
    countTeachers: itemPerPage,
  });

  return (
    <Container className="searchPageContainer">
      {isLoading && <Loader />}
      {error && <CustomError />}
      {data && !error && (
        <>
          <Box className="locationSearchPageBox">
            <NavLink to={"/"} className={"mainLink"}>
              {t("main")}
            </NavLink>
            <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
            <p className="findTeacher">{t("findTeacher")}</p>
          </Box>
          <p className="findTeacherTitle">{t("findTeacher")}</p>
          <Box>sorting</Box>
          <Box className="filterContentBox">
            <SearchFilter />
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchPage;
