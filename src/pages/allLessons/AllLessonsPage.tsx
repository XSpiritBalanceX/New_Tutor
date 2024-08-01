import { useState } from "react";
import { Container, Box, Pagination } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import { useGetLessonsQuery, useCancelLessonMutation } from "@store/requestApi/lessonsApi";
import calendar from "@assets/calendar.svg";
import CardLesson from "@components/cardLesson/CardLesson";
import ModalCancelLesson from "@components/modal/ModalCancelLesson";
import { ILesson } from "@store/requestApi/lessonsApi";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);

  const { data, error, isFetching } = useGetLessonsQuery({ countLessons: itemPerPage, currentPage: Number(page) });
  const [, { isLoading }] = useCancelLessonMutation();

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/lessons/${value}`);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    selectedLesson && setSelectedLesson(null);
  };

  const handleShowModal = (id: number) => {
    const lesson = data?.items.find((el) => el.id === id);
    if (lesson) {
      setIsOpenModal(true);
      setSelectedLesson(lesson);
    }
  };

  return error ? (
    <CustomError />
  ) : (
    <Container className="allLessonsPageContainer">
      {(isFetching || isLoading) && <Loader />}
      {selectedLesson && (
        <ModalCancelLesson isOpen={isOpenModal} cbCloseModal={handleCloseModal} lesson={selectedLesson} />
      )}
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
              {data.items.map((el, ind) => (
                <CardLesson key={ind} lesson_information={el} cbShowModal={handleShowModal} />
              ))}
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
