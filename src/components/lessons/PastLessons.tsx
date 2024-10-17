import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { translate } from "@i18n";
import { USER_TYPE } from "@utils/appConsts";
import calendar from "@assets/calendar.svg";
import CardLesson from "@components/cardLesson/CardLesson";
import { ILessonsInformation } from "@store/requestApi/bookingApi";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import CustomPagination from "@components/customPagination/CustomPagination";
import { NavLink } from "react-router-dom";
import "./Lessons.scss";

interface IPastLessonsProps {
  lessons_information: ILessonsInformation | undefined;
  currentPage: number;
  itemPerPage: number;
}

const PastLessons = ({ lessons_information, currentPage }: IPastLessonsProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(5);
  const [pagesPagination, setPagesPagination] = useState(0);

  useEffect(() => {
    if (lessons_information) {
      const pages = Math.ceil(lessons_information.all_items_count / itemPerPage);
      setPagesPagination(pages);
    }
    // eslint-disable-next-line
  }, [lessons_information]);

  return (
    <>
      {lessons_information && (
        <>
          {lessons_information.items.length === 0 && (
            <Box className="emptyDataBox">
              <img src={calendar} alt="calendar" />
              <p className="noOneLessons">{t("noPastLessons")}</p>
              <p>{t(isStudent ? "emptyDataPastLessonsStudent" : "emptyDataPastLessonsTeacher")}</p>
              {isStudent && <NavLink to={"/search/1"}>{t("findTeacher")}</NavLink>}
            </Box>
          )}
          {lessons_information.items.length !== 0 && (
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
                    isDisabledJoin={isDisabledJoinButton}
                    isHideButtons={true}
                  />
                );
              })}
            </Box>
          )}
        </>
      )}
      <CustomPagination pagesPagination={pagesPagination} currentPage={currentPage} url="/lessons/past" />
    </>
  );
};

export default PastLessons;
