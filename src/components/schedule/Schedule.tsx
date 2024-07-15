import { useState } from "react";
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
import "./Schedule.scss";

interface IScheduleProps {
  isCreating: boolean;
}

type TLesson = {
  day: number;
  time_start: string;
  time_end: string;
};

const Schedule = ({ isCreating }: IScheduleProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherSchedule" });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [schedule, setSchedule] = useState<TLesson[]>([]);
  const [errDate, setErrDate] = useState("");

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
    const lesson = {
      day: Number(day),
      time_start: moment(time, "HH:mm").utc().format("HH:mm"),
      time_end: moment(time, "HH:mm").utc().add(55, "minutes").format("HH:mm"),
    };
    const copyData = schedule.slice();
    const index = copyData.findIndex(
      (el) => el.day === lesson.day && el.time_start === lesson.time_start && el.time_end === lesson.time_end,
    );
    if (index !== -1) {
      copyData.splice(index, 1);
    } else {
      copyData.push(lesson);
    }
    setSchedule(copyData);
  };

  const handleSentSchedule = async () => {
    if (schedule.length) {
      try {
        setIsLoading(true);
        setErrDate("");
        await createSchedule({ create: schedule });
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
      </Box>
      {errDate && <Box className="errorDateBox">{errDate}</Box>}
      <Button type="button" className="submitButton" onClick={handleSentSchedule}>
        {t(isCreating ? "endRegister" : "apply")}
      </Button>
    </Box>
  );
};

export default Schedule;
