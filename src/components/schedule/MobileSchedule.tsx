import { Box } from "@mui/material";
import Slider from "react-slick";
import ButtonTime from "./ButtonTime";
import moment from "moment";
import { TLesson } from "./Schedule";
import "./Schedule.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IMobileScheduleProps {
  timeInDay: Array<string>;
  cbHandleCreateSchedule: (time: string, day: string) => void;
  schedule: TLesson[];
}

const MobileSchedule = ({ timeInDay, cbHandleCreateSchedule, schedule }: IMobileScheduleProps) => {
  const dayOfWeek = [0, 1, 2, 3, 4, 5, 6];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
  };

  return (
    <Slider {...settings} className="scheduleSlider">
      <Box className="daysTimeContainer mobileDaysTimeContainer">
        <Box className="daysBox">
          {dayOfWeek.slice(0, 4).map((el, ind) => (
            <Box key={ind} className="dayBox">
              {moment().weekday(el).format("ddd").toLowerCase()}
            </Box>
          ))}
        </Box>
        <Box className="timeBox">
          {dayOfWeek.slice(0, 4).map((day, ind) => (
            <Box key={ind} className="itemTimeBox">
              {timeInDay.map((time, index) => (
                <ButtonTime
                  key={index}
                  time={time}
                  day={day}
                  cbHandleCreateSchedule={cbHandleCreateSchedule}
                  schedule={schedule}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="daysTimeContainer mobileDaysTimeContainer">
        <Box className="daysBox">
          {dayOfWeek.slice(4).map((el, ind) => (
            <Box key={ind} className="dayBox">
              {moment().weekday(el).format("ddd").toLowerCase()}
            </Box>
          ))}
        </Box>
        <Box className="timeBox">
          {dayOfWeek.slice(4).map((day, ind) => (
            <Box key={ind} className="itemTimeBox">
              {timeInDay.map((time, index) => (
                <ButtonTime
                  key={index}
                  time={time}
                  day={day}
                  cbHandleCreateSchedule={cbHandleCreateSchedule}
                  schedule={schedule}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Slider>
  );
};

export default MobileSchedule;
