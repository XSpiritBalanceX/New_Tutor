import { useState } from "react";
import { Box, Avatar, Button, Rating, FormControlLabel, Checkbox } from "@mui/material";
import { translate } from "@i18n";
import { ITeacherInfo } from "@store/requestApi/searchApi";
import user from "@assets/user.svg";
import { languageInCases, TLanguages, level, TLevel } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import "./CardTeacher.scss";

interface ICardTeacherProps {
  info_teacher: ITeacherInfo;
}

const CardTeacher = ({ info_teacher }: ICardTeacherProps) => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  const navigate = useNavigate();

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [isFullDescription, setIsFullDescription] = useState(false);

  const firstLanguage = info_teacher.languages[0] ?? "";

  const lowLevel = [0, 1, 2];
  const averageLevel = [3, 4];

  const shortDescription = info_teacher.languages.length ? info_teacher.languages[0].description.slice(0, 125) : "";

  const handleWrite = () => {
    console.log("write");
  };

  const handleFullShortDescription = () => {
    setIsFullDescription(!isFullDescription);
  };

  const handleFreeLesson = () => {
    console.log("free lesson");
  };

  const handleNavigateToTeacherPage = () => {
    navigate(`/teacher/${info_teacher.id}`);
  };

  return (
    <Box className="cardTeacherBox">
      <Box className="teacherGeneralInfoBox">
        <Avatar src={info_teacher.photo || user} className="teacherAvatar" onClick={handleNavigateToTeacherPage} />
        <Box className="teacherInfoBox">
          <p
            className="teacherName"
            onClick={handleNavigateToTeacherPage}
          >{`${info_teacher.first_name} ${info_teacher.last_name}`}</p>
          <Box className="teacherRatingBox">
            <Rating
              value={info_teacher.rating}
              readOnly
              emptyIcon={<StarIcon className="emptyIcon" />}
              icon={<StarIcon className="fillIcon" />}
            />
            <p className="countOfFeedback">{t("countOfReviews", { count: info_teacher.feedbacks_count })}</p>
          </Box>
          <FormControlLabel
            control={<Checkbox defaultChecked={info_teacher.is_certified} disabled />}
            label={t("certificatedTeacher")}
            className="certificatedTeacherBox"
          />
          {info_teacher.languages && info_teacher.languages.length > 0 && (
            <>
              <p className="teacherLevelLanguage">
                {t("levelOfLanguage", {
                  language: languageInCases[locale as keyof TLanguages][firstLanguage.language],
                })}
                <span
                  className={
                    lowLevel.includes(firstLanguage.level)
                      ? "lowLevel"
                      : averageLevel.includes(firstLanguage.level)
                      ? "averageLevel"
                      : "highLevel"
                  }
                >
                  {level[locale as keyof TLevel][firstLanguage.level]}
                </span>
              </p>
              <Box className="priceStudentBox">
                <p className="countStudent">
                  {t("countOfStudent")} <span>{info_teacher.students_count}</span>
                </p>
                <p className="priceText">
                  {t("costPerHour")}
                  <span>${firstLanguage.price}</span>
                </p>
              </Box>
            </>
          )}
        </Box>
        <Box className="writeButtonBox">
          <Button type="button" onClick={handleWrite}>
            {t("writeMe")}
          </Button>
        </Box>
      </Box>
      {info_teacher.languages && info_teacher.languages.length > 0 && (
        <Box className="languageDescriptionBox">
          {isFullDescription ? (
            <p className="descriptionText">{firstLanguage.description}</p>
          ) : (
            <p className="descriptionText">
              {firstLanguage.description.length > 125 ? `${shortDescription}...` : `${shortDescription}`}
            </p>
          )}
          <Box className="seeDetailButtonBox">
            {firstLanguage.description.length > 125 && (
              <Button type="button" onClick={handleFullShortDescription}>
                {t(isFullDescription ? "collapse" : "more")}
              </Button>
            )}
          </Box>
        </Box>
      )}
      <Button type="button" onClick={handleFreeLesson} className="freeLessonButton">
        {t("bookFreeLesson")}
      </Button>
    </Box>
  );
};

export default CardTeacher;
