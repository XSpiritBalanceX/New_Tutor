import { useState, useEffect } from "react";
import { Container, Box, TextField, MenuItem, Pagination, Button } from "@mui/material";
import { translate } from "@i18n";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useGetTeachersListQuery } from "@store/requestApi/searchApi";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import SearchFilter from "@components/searchFilter/SearchFilter";
import EmptySearch from "./EmptySearch";
import CardTeacher from "@components/cardTeacher/CardTeacher";
import TuneIcon from "@mui/icons-material/Tune";
import MobileSearchFilter from "@components/searchFilter/MobileSearchFilter";
import "./SearchPage.scss";

const SearchPage = () => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const [itemPerPage] = useState(4);
  const [sortFilter, setSortFilter] = useState("");
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false);
  const [pagesPagination, setPagesPagination] = useState(0);

  const { data, isLoading, error, isFetching } = useGetTeachersListQuery({
    currentPage: page as string,
    countTeachers: itemPerPage,
  });

  useEffect(() => {
    if (data) {
      const pages = Math.ceil(data.all_items_count / itemPerPage);
      pages > 1 && setPagesPagination(pages);
    }
    // eslint-disable-next-line
  }, [data]);

  const sortBy = ["popular", "cheap", "expensive", "new"];

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortFilter(e.target.value);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/search/${value}`);
  };

  const handleOpenMobileFilter = () => {
    setIsOpenMobileFilter(true);
  };

  const handleCloseMobileFilter = () => {
    setIsOpenMobileFilter(false);
  };

  return (
    <Container className="searchPageContainer">
      {(isLoading || isFetching) && <Loader />}
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
            <Button type="button" className="filterButton" onClick={handleOpenMobileFilter}>
              <TuneIcon />
            </Button>
          </Box>
          <MobileSearchFilter isOpen={isOpenMobileFilter} cbHandleCloseMenu={handleCloseMobileFilter} />
          <Box className="filterContentBox">
            <SearchFilter />
            {data.items.length === 0 && <EmptySearch />}
            {data.items.length !== 0 && (
              <Box className="contentBox">
                {data.items.map((el, ind) => (
                  <CardTeacher key={ind} info_teacher={el} />
                ))}
                {pagesPagination > 0 && (
                  <Box className="paginationBox">
                    <Pagination
                      count={pagesPagination}
                      page={Number(page)}
                      onChange={handleChangePage}
                      className="searchPagination"
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchPage;
