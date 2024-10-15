import { useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteBookedLessonMutation } from "@store/requestApi/bookingApi";
import { USER_TYPE } from "@utils/appConsts";
import "./Modal.scss";

interface IModalCancelLessonProps {
  isOpen: boolean;
  cbCloseModal: () => void;
  lesson_id: number;
}

const ModalCancelLesson = ({ isOpen, cbCloseModal, lesson_id }: IModalCancelLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [deleteBookedLesson] = useDeleteBookedLessonMutation();

  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    cbCloseModal();
  };

  const handleChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.currentTarget.value);
    setErrorMessage("");
  };

  const handleSendReason = () => {
    if (!reason) {
      setErrorMessage(t("errorReason"));
    } else {
      deleteBookedLesson({ lesson_id: lesson_id, isStudent: isStudent })
        .unwrap()
        .then(() => {
          toast.success(t("sucRequest"));
          navigate("/upcoming_lessons/1");
          cbCloseModal();
        })
        .catch(() => {
          toast.error(t("errRequest"));
          cbCloseModal();
        });
    }
  };

  return (
    <Modal open={isOpen} className="modalCancelLessons">
      <Box className="contentCancelLessons">
        <Box className="closeButtonBox">
          <Button type="button" onClick={handleCloseModal}>
            <CloseOutlinedIcon />
          </Button>
        </Box>
        <Box className="mainContentBox">
          <p className="titleModal">{t("cancellingLesson")}</p>
          <p className="reasonModal">{t("reason")}</p>
          <textarea
            value={reason}
            onChange={handleChangeReason}
            placeholder={t("enterText")}
            rows={4}
            maxLength={512}
            className="fieldReason"
          />
          <p className="errorMessage">{errorMessage}</p>
          <Box className="controlsModalBox">
            <Button type="button" onClick={handleSendReason} className="cancelButton">
              {t("cancelLesson")}
            </Button>
            <Button type="button" onClick={handleCloseModal} className="closeButton">
              {t("close")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCancelLesson;
