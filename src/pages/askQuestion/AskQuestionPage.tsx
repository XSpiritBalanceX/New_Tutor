import { Container, Box, FormLabel, FormHelperText, Button } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledInput from "@components/fields/ControlledInput";
import questionPic from "@assets/askQuestion.svg";
import "./AskQuestionPage.scss";

interface IQuestion {
  email: string;
  question: string;
}

const AskQuestionPage = () => {
  const { t } = translate("translate", { keyPrefix: "askQuestionPage" });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("reqField")).email(t("wrongEmail")),
    question: Yup.string().required(t("reqField")),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IQuestion>({
    resolver: yupResolver(validationSchema),
  });

  const submitQuestion = (data: IQuestion) => {
    console.log(data);
  };

  return (
    <Container className="askQuestionPageContainer">
      <Box className="locationAskQuestionPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("askQuestion")}</p>
      </Box>
      <p className="titlePage">{t("askQuestion")}</p>
      <Box className="contentAskQuestion">
        <form onSubmit={handleSubmit(submitQuestion)}>
          <Box className="questionFieldBox emailBox">
            <FormLabel className={`questionLabel ${errors?.email ? "errorLabel" : ""}`}>{t("enterEmail")}</FormLabel>
            <ControlledInput name="email" control={control} error={errors?.email?.message} placeholder={t("email")} />
          </Box>
          <Box className="questionFieldBox">
            <FormLabel className={`questionLabel ${errors?.question ? "errorLabel" : ""}`}>
              {t("enterQuestion")}
            </FormLabel>
            <textarea
              placeholder={t("enterText")}
              {...register("question")}
              className={`questionField ${errors?.question ? "errorField" : ""}`}
              maxLength={512}
            />
            <FormHelperText className="errorMessage">{errors?.question?.message}</FormHelperText>
          </Box>
          <Box className="submitButtonBox">
            <Button type="submit">{t("send")}</Button>
          </Box>
        </form>
        <Box className="questionImageBox">
          <img src={questionPic} alt="question" />
        </Box>
      </Box>
    </Container>
  );
};

export default AskQuestionPage;
