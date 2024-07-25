import { useState } from "react";
import { Container, Box, TextField, MenuItem, Pagination } from "@mui/material";
import { translate } from "@i18n";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useGetTeachersListQuery } from "@store/requestApi/searchApi";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import SearchFilter from "@components/searchFilter/SearchFilter";
import EmptySearch from "./EmptySearch";
import "./SearchPage.scss";

const SearchPage = () => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const [itemPerPage] = useState(4);
  const [sortFilter, setSortFilter] = useState("");

  const { data, isLoading, error } = useGetTeachersListQuery({
    currentPage: page as string,
    countTeachers: itemPerPage,
  });

  const sortBy = ["popular", "cheap", "expensive", "new"];

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortFilter(e.target.value);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/search/${value}`);
  };

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
          <Box className="sortBox">
            <TextField select value={sortFilter} onChange={handleChangeSort} label={t("sortBy")} className="sortField">
              {sortBy.map((el, ind) => (
                <MenuItem key={ind} value={el}>
                  {t(el)}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="filterContentBox">
            <SearchFilter />
            {data.items.length === 0 && <EmptySearch />}
            {data.items.length !== 0 && (
              <Box className="contentBox">
                <Box className="paginationBox">
                  <Pagination
                    count={data.count}
                    page={Number(page)}
                    onChange={handleChangePage}
                    className="searchPagination"
                  />
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchPage;
