import { useState } from "react";
import { Container, Box, Pagination } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import { useGetLessonsQuery } from "@store/requestApi/lessonsApi";
import calendar from "@assets/calendar.svg";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(5);

  const { data, error, isFetching } = useGetLessonsQuery({ countLessons: itemPerPage, currentPage: Number(page) });

  console.log(data);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/lessons/${value}`);
  };

  return error ? (
    <CustomError />
  ) : (
    <Container className="allLessonsPageContainer">
      {isFetching && <Loader />}
      <Box className="locationAllLessons">
        <p className="myLessons">{t("myLessons")}</p>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p className="allLesson">{t("allLessons")}</p>
      </Box>
      <p className="titleAllLessons">{t("allLessons")}</p>
      {data && (
        <>
          {data.items.length === 0 && (
            <Box className="emptyDataBox">
              <p>{t(isStudent ? "noOneLessons" : "noOneLessonsTeacher")}</p>
              <img src={calendar} alt="calendar" />
            </Box>
          )}
          {data.items.length !== 0 && (
            <Box className="lessonsContainer">
              <p className="titleLessons">{t("upcomingLessons")}</p>
            </Box>
          )}
          <Box className="paginationBox">
            <Pagination
              count={data.count}
              page={Number(page)}
              onChange={handleChangePage}
              className="searchPagination"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default AllLessonsPage;
