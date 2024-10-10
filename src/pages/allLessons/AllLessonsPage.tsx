import { useState, useEffect } from "react";
import { Container, Box, Pagination } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import { USER_TYPE } from "@utils/appConsts";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import { useCancelLessonMutation } from "@store/requestApi/lessonsApi";
import calendar from "@assets/calendar.svg";
import CardLesson from "@components/cardLesson/CardLesson";
import ModalCancelLesson from "@components/modal/ModalCancelLesson";
import { ILesson } from "@store/requestApi/lessonsApi";
import { useGetListLessonsQuery } from "@store/requestApi/bookingApi";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  const [pagesPagination, setPagesPagination] = useState(0);

  const [, { isLoading }] = useCancelLessonMutation();

  const { data, error, isFetching } = useGetListLessonsQuery({
    limit: itemPerPage,
    offset: (Number(page) - 1) * itemPerPage,
    isStudent: isStudent,
  });

  useEffect(() => {
    if (data) {
      const pages = Math.ceil(data.all_items_count / itemPerPage);
      pages > 1 && setPagesPagination(pages);
    }
    // eslint-disable-next-line
  }, [data]);

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
      //setSelectedLesson(lesson);
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
        </>
      )}
    </Container>
  );
};

export default AllLessonsPage;
