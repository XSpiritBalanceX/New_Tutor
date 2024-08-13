import { useState } from "react";
import { Box, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { IScheduleProfileTeacherProps, ISelectedLesson, IWeekDaysResult } from "./TypesScheduleProfile";
import { translate } from "@i18n";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import * as momentTimeZone from "moment-timezone";
import moment from "moment";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";
import { language, TLanguages } from "@utils/listOfLanguagesLevels";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ButtonTime from "./ButtonTime";
import MessageAboutBook from "./MessageAboutBook";
import ModalBookLessons from "@components/modal/ModalBookLessons";
import { useBookLessonsMutation } from "@store/requestApi/teacherApi";
import { toast } from "react-toastify";
import MobileScheduleProfileTeacher from "./MobileScheduleProfileTeacher";
import "./ScheduleProfileTeacher.scss";

const ScheduleProfileTeacher = ({ schedule, languages, teacher_name, teacher_id }: IScheduleProfileTeacherProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherPage" });

  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [selectedLanguage, setSelectedLanguage] = useState<null | string>(null);
  const [extraWeek, setExtraWeek] = useState(0);
  const [selectedLessons, setSelectedLessons] = useState<ISelectedLesson[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [bookLessons] = useBookLessonsMutation();

  const currentWeek = moment().week();

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const handleChangeTimeZone = (timezone: ITimezoneOption) => {
    setSelectedTimeZone(timezone.value);
    momentTimeZone.tz.setDefault(timezone.value);
  };

  const handleSelectLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedLanguage(value);
  };

  const handleWeekDays = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    name === "add" && setExtraWeek(extraWeek + 1);
    name === "remove" && setExtraWeek(extraWeek - 1);
  };

  const getWeekDaysByWeekNumber = (weekNumber: number) => {
    const date = moment()
      .week(weekNumber || 0)
      .startOf("week");
    let weekLength = 7;
    const result: IWeekDaysResult = {
      month: "",
      dateInWeek: [],
      year: "",
      rangeDate: "",
      fullDate: [],
      dateMobile: [],
      currentWeek: date.week(),
    };
    while (weekLength--) {
      result.dateInWeek.push(date.format("DD"));
      result.fullDate.push(date.format("YYYY-MM-DD"));
      result.dateMobile.push(date.format("DD.MM.YYYY"));
      date.add(1, "day");
    }
    result.month = date.format("MMMM");
    result.year = date.format("YYYY");
    result.rangeDate = `${result.dateInWeek[0]} - ${result.dateInWeek[result.dateInWeek.length - 1]}`;
    return result;
  };

  const handleBookLesson = (lesson_id: number, date: string) => {
    const foundLesson = schedule.find((el) => el.id === lesson_id);
    const lesson: ISelectedLesson = {
      teacher_id: teacher_id,
      schedule_id: foundLesson?.id ?? 0,
      date: date,
      day: foundLesson?.day ?? 0,
      time_start: foundLesson?.time_start ?? "",
      time_end: foundLesson?.time_end ?? "",
    };
    const copyData = selectedLessons.slice();
    const index = copyData.findIndex((el) => el.schedule_id === lesson.schedule_id && el.day === lesson.day);
    if (index !== -1) {
      copyData.splice(index, 1);
    } else {
      copyData.push(lesson);
    }
    setSelectedLessons(copyData);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleBookLessons = () => {
    localStorage.removeItem("tutor_skip_auth");
    const mappedLessons = selectedLessons.map((el) => {
      return { teacher_id: el.teacher_id, schedule_id: el.schedule_id, date: el.date };
    });
    bookLessons({ booked_lessons: mappedLessons })
      .unwrap()
      .then(() => {
        localStorage.setItem("tutor_skip_auth", "true");
        setIsOpenModal(true);
      })
      .catch((err) => {
        if (err.data.type === "CannotCreatePlannedLessonException") {
          toast.error(t("errBusyTime"));
        } else {
          toast.error(t("errorRequest"));
        }
      });
  };

  return (
    <Box className="scheduleProfileContainer">
      <ModalBookLessons
        isOpen={isOpenModal}
        cbCloseModal={handleCloseModal}
        teacher_name={teacher_name}
        selectedLessons={selectedLessons}
        selectedTimeZone={selectedTimeZone}
      />
      <p className="timeTitle">{t("scheduleLessons")}</p>
      <p className="durationTitle">{t("lengthOfLesson")}</p>
      <Box className="timeZoneBox">
        <p>{t("chooseTimeZone")}</p>
        <TimezoneSelect value={selectedTimeZone} onChange={handleChangeTimeZone} className="timeZoneField" />
      </Box>
      <Box className="scheduleLanguagesBox">
        <p>{t("chooseLanguage")}</p>
        <RadioGroup onChange={handleSelectLanguage} className="scheduleLanguagesGroup">
          {languages.map((el, ind) => (
            <FormControlLabel
              key={ind}
              control={<Radio value={el.language} />}
              label={language[locale as keyof TLanguages][el.language]}
            />
          ))}
        </RadioGroup>
      </Box>
      {selectedLessons.length !== 0 && selectedLanguage && (
        <MessageAboutBook
          selectedLessons={selectedLessons}
          teacher_name={teacher_name}
          selectedLanguage={selectedLanguage as string}
          selectedTimeZone={selectedTimeZone}
          cbHandleBookLessons={handleBookLessons}
        />
      )}
      <Box className="datesControlsBox">
        <Button
          type="button"
          name="remove"
          onClick={handleWeekDays}
          disabled={currentWeek >= getWeekDaysByWeekNumber(currentWeek + extraWeek).currentWeek}
        >
          <ArrowBackIosOutlinedIcon />
        </Button>
        <p>{`${getWeekDaysByWeekNumber(currentWeek + extraWeek).month} ${
          getWeekDaysByWeekNumber(currentWeek + extraWeek).rangeDate
        }, ${getWeekDaysByWeekNumber(currentWeek + extraWeek).year}`}</p>
        <Button type="button" name="add" onClick={handleWeekDays}>
          <ArrowForwardIosOutlinedIcon />
        </Button>
      </Box>
      <Box className="datesWeekBox">
        {Array(7)
          .fill(null)
          .map((_, ind) => (
            <Box key={ind} className="dayWeekBox">
              <p className="dayOfWeek">{moment().weekday(ind).format("ddd").toLowerCase()}</p>
              <p className="dateOfWeek">{getWeekDaysByWeekNumber(currentWeek + extraWeek).dateInWeek[ind]}</p>
            </Box>
          ))}
      </Box>
      <Box className="timeDaysBox">
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <Box key={index} className="timeButtonBox">
              {schedule
                .sort((a, b) => {
                  return a.time_start < b.time_start ? -1 : a.time_start > b.time_start ? 1 : 0;
                })
                .map(
                  (el, ind) =>
                    el.day === index && (
                      <ButtonTime
                        key={ind}
                        id={el.id}
                        name={getWeekDaysByWeekNumber(currentWeek + extraWeek).fullDate[el.day]}
                        value={moment(el.time_start, "HH:mm")
                          .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
                          .format("HH:mm")}
                        cbHandleBookLessons={handleBookLesson}
                        selectedLessons={selectedLessons}
                      />
                    ),
                )}
            </Box>
          ))}
      </Box>
      <MobileScheduleProfileTeacher
        schedule={schedule}
        weekDaysByWeekNumber={getWeekDaysByWeekNumber(currentWeek + extraWeek)}
        selectedLessons={selectedLessons}
        cbHandleBookLessons={handleBookLesson}
        selectedTimeZone={selectedTimeZone}
      />
    </Box>
  );
};

export default ScheduleProfileTeacher;
