import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import * as momentTimeZone from "moment-timezone";
import moment from "moment-timezone";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";
import ButtonTime from "./ButtonTime";
import { createSchedule } from "@api/teacher/createSchedule";
import { refreshToken } from "@api/auth/refreshToken";
import { jwtDecode } from "jwt-decode";
import { IToken } from "@axiosApi/TypesAPI";
import { REGISTER_STATE, TOKEN_KEY, TOKEN_EXPIRES_KEY } from "@axiosApi/axiosAPI";
import Loader from "@components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { useUpdateTeacherScheduleMutation } from "@store/requestApi/profileApi";
import MobileSchedule from "./MobileSchedule";
import "./Schedule.scss";

interface IScheduleProps {
  isCreating: boolean;
}

export type TLesson = {
  id?: number | null;
  day: number;
  time_start: string;
  time_end: string;
};

const Schedule = ({ isCreating }: IScheduleProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherSchedule" });

  const teacherSchedule = useAppSelector(tutorSelectors.teacherScheduleSelect);

  const [updateTeacherSchedule] = useUpdateTeacherScheduleMutation();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [schedule, setSchedule] = useState<TLesson[]>([]);
  const [errDate, setErrDate] = useState("");
  const [deleteLessonID, setDeleteLessonID] = useState<number[]>([]);

  useEffect(() => {
    if (teacherSchedule) {
      setSchedule(teacherSchedule);
    }
    // eslint-disable-next-line
  }, [teacherSchedule]);

  const handleChangeTimeZone = (timezone: ITimezoneOption) => {
    setSelectedTimeZone(timezone.value);
    momentTimeZone.tz.setDefault(timezone.value);
  };

  const getTimeInDay = (from: number, to: number) => {
    const scheduleTime: Array<string> = [];
    const startTime = moment({ hour: from, minute: 0 });
    const endTime = moment({ hour: to, minute: 0 });
    scheduleTime.push(startTime.format("HH:mm"));
    while (startTime.isBefore(endTime)) {
      scheduleTime.push(startTime.add(60, "minutes").format("HH:mm"));
    }
    return scheduleTime;
  };

  const handleCreateSchedule = (time: string, day: string) => {
    const foundLesson =
      teacherSchedule &&
      teacherSchedule.find(
        (el) => el.day === Number(day) && el.time_start === moment(time, "HH:mm").utc().format("HH:mm"),
      );
    const lesson = {
      id: foundLesson?.id ?? null,
      day: Number(day),
      time_start: moment(time, "HH:mm").utc().format("HH:mm"),
      time_end: moment(time, "HH:mm").utc().add(55, "minutes").format("HH:mm"),
    };
    const copyData = schedule.slice();
    const index = copyData.findIndex(
      (el) => el.day === lesson.day && el.time_start === lesson.time_start && el.time_end === lesson.time_end,
    );
    if (index !== -1) {
      const lessonId = copyData[index];
      const copyLessonsID = deleteLessonID.slice();
      lessonId.id && !copyLessonsID.includes(lessonId.id) && copyLessonsID.push(lessonId.id);
      setDeleteLessonID(copyLessonsID);
      copyData.splice(index, 1);
    } else {
      const foundID =
        teacherSchedule && teacherSchedule.find((el) => el.day === lesson.day && el.time_start === lesson.time_start);
      const filteredLessonIDs = foundID && deleteLessonID.filter((el) => el !== foundID.id);
      filteredLessonIDs && setDeleteLessonID(filteredLessonIDs);
      copyData.push(lesson);
    }
    setSchedule(copyData);
  };

  const handleSentSchedule = async () => {
    const newSchedule: TLesson[] = [];
    schedule.forEach((el) => {
      if (!el.id) {
        newSchedule.push({ day: el.day, time_start: el.time_start, time_end: el.time_end });
      }
    });
    if (isCreating && schedule.length) {
      try {
        setIsLoading(true);
        setErrDate("");
        await createSchedule({ create: newSchedule });
        const responseToken = await refreshToken();
        if (responseToken) {
          const decode: IToken = jwtDecode(responseToken);
          localStorage.setItem(TOKEN_KEY, responseToken);
          localStorage.setItem(TOKEN_EXPIRES_KEY, decode.exp.toString());
          localStorage.removeItem(REGISTER_STATE);
          navigate("/");
        }
      } catch (err: any) {
        if (err.response.status === 400) {
          const compiledDate = err.response.data.message.split("'")[1].split(":").slice(0, 2);
          const busyDate = `${moment().weekday(Number(compiledDate[0])).format("dddd")} ${moment(
            compiledDate[1],
            "HH:mm",
          )
            .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
            .format("HH:mm")}`;
          setErrDate(t(""));
          setErrDate(t("errDate", { date: busyDate }));
        }
      } finally {
        setIsLoading(false);
      }
    } else if (!isCreating && (newSchedule.length || deleteLessonID.length)) {
      try {
        setIsLoading(true);
        await updateTeacherSchedule({ createLesson: newSchedule, deleteLesson: deleteLessonID }).unwrap();
        setDeleteLessonID([]);
      } catch (err: any) {
        console.log("ERROR HERE", err.response);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box className="teacherScheduleContainer">
      {isLoading && <Loader />}
      <Box className="scheduleContainer">
        <p className="timeTitle">{t("chooseTime")}</p>
        <p className="durationTitle">{t("durationOfLesson")}</p>
        <Box className="timeZoneBox">
          <p>{t("chooseTimeZone")}</p>
          <TimezoneSelect value={selectedTimeZone} onChange={handleChangeTimeZone} className="timeZoneField" />
        </Box>
        <Box className="daysTimeContainer">
          <Box className="daysBox">
            {Array(7)
              .fill(null)
              .map((_, ind) => (
                <Box key={ind} className="dayBox">
                  {moment().weekday(ind).format("ddd").toLowerCase()}
                </Box>
              ))}
          </Box>
          <Box className="timeBox">
            {Array(7)
              .fill(null)
              .map((_, ind) => (
                <Box key={ind}>
                  {getTimeInDay(0, 23).map((el, index) => (
                    <ButtonTime
                      key={index}
                      time={el}
                      day={ind}
                      cbHandleCreateSchedule={handleCreateSchedule}
                      schedule={schedule}
                    />
                  ))}
                </Box>
              ))}
          </Box>
        </Box>
        <MobileSchedule
          timeInDay={getTimeInDay(0, 23)}
          cbHandleCreateSchedule={handleCreateSchedule}
          schedule={schedule}
        />
      </Box>
      {errDate && <Box className="errorDateBox">{errDate}</Box>}
      <Button type="button" className="submitButton" onClick={handleSentSchedule}>
        {t(isCreating ? "endRegister" : "apply")}
      </Button>
    </Box>
  );
};

export default Schedule;
