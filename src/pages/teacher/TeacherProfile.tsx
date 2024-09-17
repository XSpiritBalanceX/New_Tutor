import { useState, useEffect } from "react";
import { Box, Avatar, Rating, FormControlLabel, Checkbox, Button } from "@mui/material";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import StarIcon from "@mui/icons-material/Star";
import { languageInCases, TLanguages, level, TLevel } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./TeacherPage.scss";

interface ITeacherProfileProps {
  teacher_information: {
    id: number;
    first_name: string;
    last_name: string;
    photo: null | string;
  };
  teacher_languages: {
    id: number;
    language: number;
    level: number;
    price: number;
    description: string;
    files: { id: number; file: string }[];
  }[];
}

const TeacherProfile = ({ teacher_information, teacher_languages }: ITeacherProfileProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [languagesList, setLanguagesList] = useState(teacher_languages);
  const [isFullList, setIsFullList] = useState(false);

  useEffect(() => {
    isFullList && setLanguagesList(teacher_languages);
    !isFullList && setLanguagesList(teacher_languages.slice(0, 1));
    // eslint-disable-next-line
  }, [isFullList]);

  const handleSeeMore = () => {
    setIsFullList(!isFullList);
  };

  const lowLevel = [0, 1, 2];
  const averageLevel = [3, 4];

  const handleWriteTeacher = () => {
    console.log("write", teacher_information.id);
  };

  return (
    <Box className="teacherProfilePageBox">
      <Box className="teacherInformationBox">
        <Avatar src={teacher_information.photo || user} className="teacherAvatar" />
        <Box className="teacherInformationContent">
          <p className="teacherName">{`${teacher_information.first_name} ${teacher_information.last_name}`}</p>
          <Box className="teacherRatingBox">
            <Rating
              value={0}
              readOnly
              emptyIcon={<StarIcon className="emptyIcon" />}
              icon={<StarIcon className="fillIcon" />}
            />
            <p className="countOfFeedback">{t("countOfReviews", { count: 0 })}</p>
          </Box>
          <FormControlLabel
            control={<Checkbox defaultChecked={true} disabled />}
            label={t("certificatedTeacher")}
            className="certificatedTeacherBox"
          />
          {languagesList.map((el, ind) => (
            <Box key={ind} className={`languageBox ${languagesList.length > 1 ? "expandedList" : ""}`}>
              <p className="levelOfLanguage">
                {t("levelOfLanguage", { language: languageInCases[locale as keyof TLanguages][el.language] })}
                <span
                  className={
                    lowLevel.includes(el.level)
                      ? "lowLevel"
                      : averageLevel.includes(el.level)
                      ? "averageLevel"
                      : "highLevel"
                  }
                >
                  {level[locale as keyof TLevel][el.level]}
                </span>
              </p>
              <p className="countOfStudent">
                {t("countOfStudent")} <span className="newTeacher">{t("newTeacher")}</span>
              </p>
              <p className="costPerHour">
                {t("costPerHour")} <span>${el.price}</span>
              </p>
            </Box>
          ))}
          {teacher_languages.length > 1 && (
            <Box className="seeMoreButtonBox">
              <Button type="button" onClick={handleSeeMore}>
                {t(isFullList ? "collapse" : "seeMore")}
              </Button>
            </Box>
          )}
          <Box className="writeButtonBox">
            <Button type="button" onClick={handleWriteTeacher}>
              {t("writeMe")}
            </Button>
          </Box>
        </Box>
      </Box>
      {teacher_languages.length > 0 && (
        <Box className="teacherSkillsBox">
          <p className="titleSkills">{t("professionalSkills")}</p>
          <Box className="descriptionsBox">
            {teacher_languages.map((el, ind) => (
              <p key={ind}>{el.description}</p>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TeacherProfile;
