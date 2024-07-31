import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { IMessageAboutBookProps } from "./TypesScheduleProfile";
import { languageInCases, TLanguages } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./ScheduleProfileTeacher.scss";

const MessageAboutBook = ({
  selectedLessons,
  teacher_name,
  selectedLanguage,
  selectedTimeZone,
}: IMessageAboutBookProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const strSelectedLessons = selectedLessons
    .sort((a, b) => {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    })
    .map(
      (el) =>
        `${moment(el.date).format("MMMM DD")}, ${moment(el.time_start, "HH:mm")
          .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
          .format("HH:mm")}-${moment(el.time_end, "HH:mm")
          .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
          .format("HH:mm")}`,
    )
    .join("; ");

  return (
    <Box className="messageAboutBookBox">
      <p className="lessonsBooked">
        {t("youWanToToBookLesson", {
          language: languageInCases[locale as keyof TLanguages][Number(selectedLanguage)],
          teacherName: teacher_name,
          dates: strSelectedLessons,
        })}
      </p>
      <Box className="buttonBookBox">
        <Button type="button">{t("book")}</Button>
      </Box>
    </Box>
  );
};

export default MessageAboutBook;
