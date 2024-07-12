import { useState } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import * as momentTimeZone from "moment-timezone";
import moment from "moment-timezone";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";
import ButtonTime from "./ButtonTime";
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

  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [schedule, setSchedule] = useState<TLesson[]>([]);

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

  return (
    <Box className="teacherScheduleContainer">
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
      <Button type="button" className="submitButton">
        {t(isCreating ? "endRegister" : "apply")}
      </Button>
    </Box>
  );
};

export default Schedule;
