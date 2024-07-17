import { useState, useEffect } from "react";
import { Box, FormLabel, FormHelperText, Button } from "@mui/material";
import { ICertificatesProps } from "./TypesTeacherRow";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { translate } from "@i18n";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./TeacherRow.scss";

interface IResponseAxios {
  headers: {
    get: (value: string) => string;
  };
}

const Certificates = <T extends FieldValues>({ id, watch, setValue }: ICertificatesProps<T>) => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const { pathname } = useLocation();

  useEffect(() => {
    setValue(`teaching_languages.${id}.certificate` as Path<T>, [] as PathValue<T, Path<T>>);
    // eslint-disable-next-line
  }, []);

  const currentCertificates = watch(`teaching_languages.${id}.certificate` as Path<T>);

  const [certificates, setCertificates] = useState<(File | { id: number; file: string })[]>(currentCertificates || []);
  const [certificateError, setCertificateError] = useState("");
  const [size, setSize] = useState<{ element: string; size: string }[]>([]);
  const [loadingSizeFile, setLoadingSizeFile] = useState(true);

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

  useEffect(() => {
    if (currentCertificates) {
      const getSize = async () => {
        return Promise.all(
          certificates.map((el) => {
            return (
              "id" in el &&
              axios((el as { id: number; file: string }).file, {
                method: "GET",
                headers: { "X-HTTP-Method-Override": "HEAD" },
              })
                .then((res) => {
                  const response = res as IResponseAxios;
                  const sizeInMB = convertSize(Number(response.headers.get("Content-Length")));
                  const existingIndex = size.findIndex(
                    (item) => item.element === (el as { id: number; file: string }).file!,
                  );
                  if (existingIndex !== -1) {
                    setSize((prev) => {
                      return [
                        ...prev.slice(0, existingIndex),
                        { ...prev[existingIndex], size: sizeInMB },
                        ...prev.slice(existingIndex + 1),
                      ];
                    });
                  } else {
                    setSize((prev) => {
                      return [
                        ...prev,
                        {
                          element: (el as { id: number; file: string }).file!,
                          size: sizeInMB,
                        },
                      ];
                    });
                  }
                  setLoadingSizeFile(false);
                })
                .catch((err) => console.log(err))
            );
          }),
        );
      };

      pathname !== "registration/teacher" && getSize();
    }
    // eslint-disable-next-line
  }, [loadingSizeFile, currentCertificates]);

  return (
    <Box className="teacherFieldBox teacherCertificateBox">
      <FormLabel className="teacherFormLabel">{t("uploadCertificate")}</FormLabel>
      {certificates.map((el, ind) => {
        return el instanceof File ? (
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
        ) : (
          <Box key={ind} className="certificateBox">
            <img src={el.file} alt="certificate" />
            <Box className="certificateNameSizeBox">
              <p className="certificateName">
                {new URL(el.file).pathname.split("%3B")[2].replace(/.{19}(?=\.png|.jpg)/, "")}
              </p>
              <p className="certificateSize">
                {!loadingSizeFile && size.find((file) => file.element === el.file)?.size} MB
              </p>
            </Box>
            <Button type="button" onClick={() => handleDeletePhoto(ind)} className="deleteCertificateButton">
              <CloseIcon />
            </Button>
          </Box>
        );
      })}
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
