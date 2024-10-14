import { useState, useEffect } from "react";
import { Container, Box, Pagination } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import { USER_TYPE } from "@utils/appConsts";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import calendar from "@assets/calendar.svg";
import CardLesson from "@components/cardLesson/CardLesson";
import ModalCancelLesson from "@components/modal/ModalCancelLesson";
import { useGetListLessonsQuery, useDeleteBookedLessonMutation } from "@store/requestApi/bookingApi";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState<null | number>(null);
  const [pagesPagination, setPagesPagination] = useState(0);
  const [canceledLesson, setCanceledLesson] = useState<number[]>([]);

  const [, { isLoading }] = useDeleteBookedLessonMutation();

  const { data, error, isFetching, refetch } = useGetListLessonsQuery({
    limit: itemPerPage,
    offset: (Number(page) - 1) * itemPerPage,
    isStudent: isStudent,
  });

  useEffect(() => {
    const processedLessons = new Set();
    const lessonsClosed: number[] = [];

    const checkUpcomingLessons = () => {
      if (data && data.items.length > 0) {
        const now = moment();
        const userTimeZoneOffset = momentTimeZone.tz(momentTimeZone.tz.guess()).utcOffset();

        data.items.forEach((lesson) => {
          const lessonTime = moment(`${lesson.date} ${lesson.time}`, "YYYY-MM-DD HH:mm").add(
            userTimeZoneOffset,
            "minutes",
          );

          const isToday = lessonTime.isSame(now, "day");
          const difference = lessonTime.diff(now, "minutes");

          if (isToday && difference <= 10 && difference >= -13 && !processedLessons.has(lesson.id)) {
            refetch();
            processedLessons.add(lesson.id);
          }

          if (difference < -14) {
            lessonsClosed.push(lesson.id);
          }
        });
        setCanceledLesson(lessonsClosed);
      }
    };

    const intervalId = setInterval(checkUpcomingLessons, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [data, refetch]);

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
    deleteLessonId && setDeleteLessonId(null);
  };

  const handleShowModal = (id: number) => {
    const lesson = data?.items.find((el) => el.id === id);
    if (lesson) {
      setIsOpenModal(true);
      setDeleteLessonId(lesson.id);
    }
  };

  return error ? (
    <CustomError />
  ) : (
    <Container className="allLessonsPageContainer">
      {(isFetching || isLoading) && <Loader />}
      {deleteLessonId && (
        <ModalCancelLesson isOpen={isOpenModal} cbCloseModal={handleCloseModal} lesson_id={deleteLessonId} />
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
              {data.items.map((el, ind) => {
                const userTimeZoneOffset = momentTimeZone.tz(momentTimeZone.tz.guess()).utcOffset();
                const now = moment();
                const lessonDate = moment(`${el.date} ${el.time}`, "YYYY-MM-DD HH:mm").add(
                  userTimeZoneOffset,
                  "minutes",
                );
                const isToday = lessonDate.isSame(now, "day");
                const difference = lessonDate.diff(now, "minutes");
                const isHideButton = canceledLesson.includes(el.id)
                  ? true
                  : isToday && difference >= -14
                  ? false
                  : true;
                const isDisabledJoinButton =
                  isToday && difference <= 10 && difference >= -14 && el.video_room_id ? false : true;
                return (
                  <CardLesson
                    key={ind}
                    lesson_information={el}
                    cbShowModal={handleShowModal}
                    isHideButton={isHideButton}
                    isDisabledJoin={isDisabledJoinButton}
                  />
                );
              })}
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
