import { useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ILesson } from "@store/requestApi/lessonsApi";
import { useCancelLessonMutation } from "@store/requestApi/lessonsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";

interface IModalCancelLessonProps {
  isOpen: boolean;
  cbCloseModal: () => void;
  lesson: ILesson;
}

const ModalCancelLesson = ({ isOpen, cbCloseModal, lesson }: IModalCancelLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const [cancelLesson] = useCancelLessonMutation();

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
      cancelLesson([{ lesson_id: lesson.id, reason: reason }])
        .unwrap()
        .then(() => {
          toast.success(t("sucRequest"));
          navigate("/lessons/1");
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
