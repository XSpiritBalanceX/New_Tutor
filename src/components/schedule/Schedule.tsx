import { useState } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import * as momentTimeZone from "moment-timezone";
import moment from "moment-timezone";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";
import "./Schedule.scss";

interface IScheduleProps {
  isCreating: boolean;
}

const Schedule = ({ isCreating }: IScheduleProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherSchedule" });

  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleChangeTimeZone = (timezone: ITimezoneOption) => {
    setSelectedTimeZone(timezone.value);
    momentTimeZone.tz.setDefault(timezone.value);
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
      </Box>
      <Button type="button" className="submitButton">
        {t(isCreating ? "endRegister" : "apply")}
      </Button>
    </Box>
  );
};

export default Schedule;
