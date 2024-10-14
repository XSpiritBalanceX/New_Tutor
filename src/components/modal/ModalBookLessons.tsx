import { Modal, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import { ISelectedLesson } from "@components/scheduleProfileTeacher/TypesScheduleProfile";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import calendar from "@assets/calendar.svg";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";

interface IModalBookLessonsProps {
  isOpen: boolean;
  cbCloseModal: () => void;
  teacher_name: string;
  selectedLessons: ISelectedLesson[];
  selectedTimeZone: string;
}

const ModalBookLessons = ({
  isOpen,
  cbCloseModal,
  teacher_name,
  selectedLessons,
  selectedTimeZone,
}: IModalBookLessonsProps) => {
  const { t } = translate("translate", { keyPrefix: "notification.bookLessons" });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    cbCloseModal();
  };

  const handleNavigateLessons = () => {
    navigate("/lessons/1");
  };

  return (
    <Modal open={isOpen} className="modalBookLessons">
      <Box className="contentBookLessons">
        <Box className="closeButtonBox">
          <Button type="button" onClick={handleCloseModal}>
            <CloseOutlinedIcon />
          </Button>
        </Box>
        <Box className="bookingInformation">
          <p className="youBooked">{t("youBookedLessons")}</p>
          <p className="withTeacher">{t("youBookedWithTeacher", { name: teacher_name })}</p>
          {selectedLessons
            .sort((a, b) => {
              return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
            })
            .map((el, ind) => (
              <p key={ind} className="timeLesson">
                {t("onLesson", {
                  date: `${moment(el.date).format("MMMM DD")}, ${moment(el.time_start, "HH:mm")
                    .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
                    .format("HH:mm")}-${moment(el.time_end, "HH:mm")
                    .add(momentTimeZone.tz(selectedTimeZone).utcOffset(), "minutes")
                    .format("HH:mm")}`,
                })}
              </p>
            ))}
        </Box>
        <Box className="imageBox">
          <img src={calendar} alt="calendar" />
        </Box>
        <Box className="navigateButtonBox">
          <Button type="button" onClick={handleNavigateLessons}>
            {t("navigateToLessons")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalBookLessons;
