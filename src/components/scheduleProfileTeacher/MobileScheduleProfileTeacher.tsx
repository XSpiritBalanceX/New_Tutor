import { Box } from "@mui/material";
import Slider from "react-slick";
import ButtonTime from "./ButtonTime";
import moment from "moment";
import { IMobileScheduleProfileTeacherProps } from "./TypesScheduleProfile";
import * as momentTimeZone from "moment-timezone";
import "./ScheduleProfileTeacher.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MobileScheduleProfileTeacher = ({
  schedule,
  weekDaysByWeekNumber,
  selectedLessons,
  cbHandleBookLessons,
  selectedTimeZone,
}: IMobileScheduleProfileTeacherProps) => {
  const uniqueDays = Array.from(new Set(schedule.map((item) => item.day))).sort((a, b) => a - b);

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
    <Slider {...settings} className="scheduleMobileSlider">
      {uniqueDays.map((el, ind) => (
        <Box key={ind}>
          <Box className="dateBox">{<p>{weekDaysByWeekNumber.dateMobile[el]}</p>}</Box>
          <Box className="timesBox">
            {schedule.map(
              (item, index) =>
                item.day === el && (
                  <ButtonTime
                    key={index}
                    id={item.id}
                    name={weekDaysByWeekNumber.fullDate[item.day]}
                    value={moment(item.time_start, "HH:mm")
                      .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
                      .format("HH:mm")}
                    cbHandleBookLessons={cbHandleBookLessons}
                    selectedLessons={selectedLessons}
                  />
                ),
            )}
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default MobileScheduleProfileTeacher;
