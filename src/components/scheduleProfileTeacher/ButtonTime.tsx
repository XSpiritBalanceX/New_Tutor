import { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { IButtonTimeProps } from "./TypesScheduleProfile";
import moment from "moment";
import "./ScheduleProfileTeacher.scss";

const ButtonTime = ({ id, name, value, cbHandleBookLessons, selectedLessons }: IButtonTimeProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const currentDate = moment();

  useEffect(() => {
    if (currentDate.isAfter(moment(name, "YYYY-MM-DD")) && !currentDate.isSame(moment(name, "YYYY-MM-DD"), "day")) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    // eslint-disable-next-line
  }, [name, value]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    cbHandleBookLessons(id, name);
  };

  const isTimeInSchedule = selectedLessons.some((item) => item.date === name && item.schedule_id === id);

  return (
    <FormControlLabel
      control={
        <Checkbox
          className="timeCheckbox"
          value={value}
          name={name}
          onChange={handleCheck}
          checked={isTimeInSchedule}
          disabled={isDisabled}
        />
      }
      label={value}
      className="timeButton"
    />
  );
};

export default ButtonTime;
