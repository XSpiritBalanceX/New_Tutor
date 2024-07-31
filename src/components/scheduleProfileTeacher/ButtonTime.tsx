import { FormControlLabel, Checkbox } from "@mui/material";
import { IButtonTimeProps } from "./TypesScheduleProfile";
import "./ScheduleProfileTeacher.scss";

const ButtonTime = ({ id, name, value, cbHandleBookLessons, selectedLessons }: IButtonTimeProps) => {
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
        />
      }
      label={value}
      className="timeButton"
    />
  );
};

export default ButtonTime;
