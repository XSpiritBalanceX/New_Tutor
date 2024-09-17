import { Modal, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDeleteStudentLanguageMutation, useDeleteTeacherLanguageMutation } from "@store/requestApi/profileApi";
import { USER_TYPE } from "@utils/appConsts";
import { toast } from "react-toastify";
import { language, TLanguages } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { TStudentLanguage } from "@components/profileStudent/TypesProfileStudent";
import "./Notification.scss";

interface IDeleteLanguageNotificationProps {
  isOpen: boolean;
  cbCloseModal: () => void;
  currentLanguage: TStudentLanguage | null;
}

const DeleteLanguageNotification = ({ isOpen, cbCloseModal, currentLanguage }: IDeleteLanguageNotificationProps) => {
  const { t } = translate("translate", { keyPrefix: "notification.deleteLanguage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [deleteStudentLanguage] = useDeleteStudentLanguageMutation();
  const [deleteTeacherLanguage] = useDeleteTeacherLanguageMutation();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const handleCloseModal = () => {
    cbCloseModal();
  };

  const handleDeleteLanguage = () => {
    if (currentLanguage) {
      const deletedLanguage = language[locale as keyof TLanguages][Number(currentLanguage.language)];
      isStudent &&
        deleteStudentLanguage([currentLanguage.id as number])
          .unwrap()
          .then(() => toast.success(t("messageSucDelete", { language: deletedLanguage })))
          .catch(() => toast.error(t("messageErrDelete")));
      !isStudent &&
        deleteTeacherLanguage([currentLanguage.id as number])
          .unwrap()
          .then(() => toast.success(t("messageSucDelete", { language: deletedLanguage })))
          .catch(() => toast.error(t("messageErrDelete")));
      cbCloseModal();
    }
  };

  return (
    <Modal open={isOpen} className="deleteLanguageModal">
      <Box className="contentDeleteLanguageModal">
        <Box className="closeButtonBox">
          <Button type="button" onClick={handleCloseModal}>
            <CloseOutlinedIcon />
          </Button>
        </Box>
        <Box>
          <p className="title">{t("title")}</p>
          <p className="text">{t("text")}</p>
          <Box className="controlsButtonsBox">
            <Button type="button" onClick={handleDeleteLanguage} className="deleteButton">
              {t("delete")}
            </Button>
            <Button type="button" onClick={handleCloseModal} className="closeButton">
              {t("cancel")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteLanguageNotification;
