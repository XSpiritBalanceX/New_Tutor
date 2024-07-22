import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./Notification.scss";

interface IProfileEmailNotificationProps {
  cbHandleCloseNotification: () => void;
}

const ProfileEmailNotification = ({ cbHandleCloseNotification }: IProfileEmailNotificationProps) => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const handleCloseNotification = () => {
    cbHandleCloseNotification();
  };

  const handleResentLetter = () => {
    console.log("resent");
  };

  return (
    <Box className="profileEmailNotificationBox">
      <Box className="titleButtonBox">
        <p>{t("titleConfirmEmail")}</p>
        <Button onClick={handleCloseNotification}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <Button className="resentButton" onClick={handleResentLetter}>
        {t("buttonConfirmEmail")}
      </Button>
    </Box>
  );
};

export default ProfileEmailNotification;
