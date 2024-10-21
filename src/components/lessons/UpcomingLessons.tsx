import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { translate } from "@i18n";
import { USER_TYPE } from "@utils/appConsts";
import calendar from "@assets/calendar.svg";
import CardLesson from "@components/cardLesson/CardLesson";
import ModalCancelLesson from "@components/modal/ModalCancelLesson";
import { ILessonsInformation } from "@store/requestApi/bookingApi";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import CustomPagination from "@components/customPagination/CustomPagination";
import { NavLink } from "react-router-dom";
import "./Lessons.scss";

interface IUpcomingLessonsProps {
  lessons_information: ILessonsInformation | undefined;
  refetch: () => void;
  currentPage: number;
  itemPerPage: number;
}

const UpcomingLessons = ({ lessons_information, refetch, currentPage, itemPerPage }: IUpcomingLessonsProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState<null | number>(null);
  const [pagesPagination, setPagesPagination] = useState(0);

  useEffect(() => {
    const checkUpcomingLessons = () => {
      if (lessons_information && lessons_information.items.length > 0) {
        const now = moment();
        const userTimeZoneOffset = momentTimeZone.tz(momentTimeZone.tz.guess()).utcOffset();

        lessons_information.items.forEach((lesson) => {
          const lessonTime = moment(`${lesson.date} ${lesson.time}`, "YYYY-MM-DD HH:mm").add(
            userTimeZoneOffset,
            "minutes",
          );

          const isToday = lessonTime.isSame(now, "day");
          const difference = lessonTime.diff(now, "minutes");

          if (isToday && difference <= 10 && difference >= -13 && !lesson.video_room_id) {
            refetch();
          }
        });
      }
    };

    const intervalId = setInterval(checkUpcomingLessons, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [lessons_information, refetch]);

  useEffect(() => {
    if (lessons_information) {
      const pages = Math.ceil(lessons_information.all_items_count / itemPerPage);
      setPagesPagination(pages);
    }
    // eslint-disable-next-line
  }, [lessons_information]);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    deleteLessonId && setDeleteLessonId(null);
  };

  const handleShowModal = (id: number) => {
    const lesson = lessons_information?.items.find((el) => el.id === id);
    if (lesson) {
      setIsOpenModal(true);
      setDeleteLessonId(lesson.id);
    }
  };

  return (
    <>
      {deleteLessonId && (
        <ModalCancelLesson isOpen={isOpenModal} cbCloseModal={handleCloseModal} lesson_id={deleteLessonId} />
      )}
      {lessons_information && (
        <>
          {lessons_information.items.length === 0 && (
            <Box className="emptyDataBox">
              <img src={calendar} alt="calendar" />
              <p className="noOneLessons">{t("noOneLessons")}</p>
              <p>{t(isStudent ? "emptyBookedLessonsStudent" : "emptyBookedLessonsTeacher")}</p>
              {isStudent && <NavLink to={"/search/1"}>{t("findTeacher")}</NavLink>}
            </Box>
          )}
          {lessons_information.items.length !== 0 && (
            <Box className="fullContentLessonsBox">
              <Box className="lessonsContainer">
                {lessons_information.items.map((el, ind) => {
                  const userTimeZoneOffset = momentTimeZone.tz(momentTimeZone.tz.guess()).utcOffset();
                  const now = moment();
                  const lessonDate = moment(`${el.date} ${el.time}`, "YYYY-MM-DD HH:mm").add(
                    userTimeZoneOffset,
                    "minutes",
                  );
                  const isToday = lessonDate.isSame(now, "day");
                  const difference = lessonDate.diff(now, "minutes");
                  const isDisabledJoinButton =
                    isToday && difference <= 10 && difference >= -14 && el.video_room_id ? false : true;
                  return (
                    <CardLesson
                      key={ind}
                      lesson_information={el}
                      cbShowModal={handleShowModal}
                      isDisabledJoin={isDisabledJoinButton}
                    />
                  );
                })}
              </Box>
              <CustomPagination pagesPagination={pagesPagination} currentPage={currentPage} url="/lessons/upcoming" />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default UpcomingLessons;
