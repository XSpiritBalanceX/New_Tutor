import { useState } from "react";
import { Box, Button, Avatar, FormHelperText } from "@mui/material";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import { uploadAvatar } from "@api/user/uploadAvatar";
import { toast } from "react-toastify";
import "./UserAvatar.scss";

interface IUserAvatarProps {
  photo?: null | string;
}

const UserAvatar = ({ photo }: IUserAvatarProps) => {
  const { t } = translate("translate", { keyPrefix: "userAvatar" });

  const [picture, setPicture] = useState<File | null>(null);
  const [errPicture, setErrPicture] = useState("");

  const handleCheckPhoto = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file.size >= 2097152) {
      setErrPicture(t("errorFileSizeImage"));
      return false;
    } else if (!allowedTypes.includes(file.type)) {
      setErrPicture(t("errorTypeImage"));
      return false;
    } else {
      setErrPicture("");
    }
    return true;
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const newPhoto = files && files[0];
    if (newPhoto) {
      const isValid = handleCheckPhoto(newPhoto);
      isValid && handleSentPhoto(newPhoto);
    }
  };

  const handleSentPhoto = async (photo: File) => {
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      await uploadAvatar(formData);
      setPicture(photo);
      toast.success(t("messageSucUpload"));
    } catch (err: any) {
      toast.error("messageErrUpload");
    }
  };

  const handleDeleteAvatar = () => {
    setErrPicture("");
    setPicture(null);
  };

  return (
    <Box className="avatarBox">
      {!picture && <Avatar src={photo || user} className="userAvatar" />}
      {picture && <Avatar src={URL.createObjectURL(picture)} className="userAvatar" />}
      <Box className="controlsAvatarBox">
        <Box>
          <label htmlFor="file_input" className="uploadAvatar">
            {t("upload")}
          </label>
          <input type="file" id="file_input" style={{ display: "none" }} onChange={handleUploadPhoto} />
          <Button type="button" className="deleteAvatar" onClick={handleDeleteAvatar}>
            {t("delete")}
          </Button>
        </Box>
        <p className="hintText">{t("hintPhoto")}</p>
        <FormHelperText className="errorMessage">{errPicture}</FormHelperText>
      </Box>
    </Box>
  );
};

export default UserAvatar;
