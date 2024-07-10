import { useState, useEffect } from "react";
import { Box, FormLabel, FormHelperText, Button } from "@mui/material";
import { ICertificatesProps } from "./TypesTeacherRow";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { translate } from "@i18n";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "./TeacherRow.scss";

const Certificates = <T extends FieldValues>({ id, watch, setValue }: ICertificatesProps<T>) => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  useEffect(() => {
    setValue(`teaching_languages.${id}.certificate` as Path<T>, [] as PathValue<T, Path<T>>);
    // eslint-disable-next-line
  }, []);

  const currentCertificates = watch(`teaching_languages.${id}.certificate` as Path<T>);

  const [certificates, setCertificates] = useState<File[]>(currentCertificates || []);
  const [certificateError, setCertificateError] = useState("");

  const convertSize = (value: number) => {
    const kbInMb = 1024;
    return (value / kbInMb / kbInMb).toFixed(2);
  };

  const handleCheckCertificate = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (file.size >= 2097152) {
      setCertificateError(t("errorFileSizeImage"));
      return false;
    } else if (!allowedTypes.includes(file.type)) {
      setCertificateError(t("errorTypeImage"));
      return false;
    } else {
      setCertificateError("");
    }
    return true;
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const newCertificate = files && files[0];
    if (newCertificate) {
      const isValid = handleCheckCertificate(newCertificate);
      const copyData = certificates.slice();
      copyData.push(newCertificate);
      if (isValid) {
        setCertificates(copyData);
        setValue(`teaching_languages.${id}.certificate` as Path<T>, copyData as PathValue<T, Path<T>>);
      }
    }
  };

  const handleDeletePhoto = (ind: number) => {
    const copyData = certificates.slice();
    copyData.splice(ind, 1);
    setCertificates(copyData);
    setValue(`teaching_languages.${id}.certificate` as Path<T>, copyData as PathValue<T, Path<T>>);
  };

  return (
    <Box className="teacherFieldBox teacherCertificateBox">
      <FormLabel className="teacherFormLabel">{t("uploadCertificate")}</FormLabel>
      {certificates.map(
        (el, ind) =>
          el && (
            <Box key={ind} className="certificateBox">
              <img src={URL.createObjectURL(el)} alt="certificate" />
              <Box className="certificateNameSizeBox">
                <p className="certificateName">{el.name}</p>
                <p className="certificateSize">{convertSize(el.size)} MB</p>
              </Box>
              <Button type="button" onClick={() => handleDeletePhoto(ind)} className="deleteCertificateButton">
                <CloseIcon />
              </Button>
            </Box>
          ),
      )}
      <FormHelperText className="errorMessage">{certificateError}</FormHelperText>
      {certificates.length < 5 && (
        <Box className="addCertificateBox">
          <label htmlFor={`file_input_${id}`} className="labelCertificate">
            <AddIcon />
          </label>
          <input type="file" id={`file_input_${id}`} style={{ display: "none" }} onChange={handleUploadPhoto} />
          <Box>
            <p>{t("hintCertificate1")}</p>
            <p>{t("hintCertificate2")}</p>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Certificates;
