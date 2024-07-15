import { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import moment from "moment";
import "./Schedule.scss";

interface IButtonTimeProps {
  time: string;
  day: number;
  cbHandleCreateSchedule: (time: string, day: string) => void;
  schedule: { day: number; time_start: string; time_end: string }[];
}

const ButtonTime = ({ time, day, cbHandleCreateSchedule, schedule }: IButtonTimeProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setIsChecked((prevState) => {
      cbHandleCreateSchedule(name, value);
      return !prevState;
    });
  };

  const isTimeInSchedule = schedule.some(
    (item) => item.day === day && item.time_start === moment(time, "HH:mm").utc().format("HH:mm"),
  );

  return (
    <FormControlLabel
      control={
        <Checkbox
          className="timeCheckbox"
          value={day}
          name={time}
          onChange={handleCheck}
          checked={isChecked || isTimeInSchedule}
        />
      }
      label={time}
      className="timeButton"
    />
  );
};

export default ButtonTime;
