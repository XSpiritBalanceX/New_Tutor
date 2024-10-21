import { Container, Box, FormLabel, FormHelperText, Button, Rating } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import reviewPic from "@assets/review.svg";
import { Path, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import StarIcon from "@mui/icons-material/Star";
import "./ReviewPage.scss";

interface IReview {
  rating: number;
  impression: string;
  plus: string;
  minus: string;
}

const ReviewPage = () => {
  const { t } = translate("translate", { keyPrefix: "reviewPage" });

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required(t("perforEvalTeacher")),
    impression: Yup.string().required(t("reqField")),
    plus: Yup.string().required(t("reqField")),
    minus: Yup.string().required(t("reqField")),
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IReview>({
    resolver: yupResolver(validationSchema),
  });

  const submitReview = (data: IReview) => {
    console.log(data);
  };

  const fields = [
    { name: "impression", label: "commonImpression", error: errors?.impression?.message },
    { name: "plus", label: "pros", error: errors?.plus?.message },
    { name: "minus", label: "cons", error: errors?.minus?.message },
  ];

  const handleChangeRating = (_: React.SyntheticEvent, value: number | null) => {
    if (value) {
      setValue("rating", value);
    }
  };

  return (
    <Container className="reviewPageContainer">
      <Box className="locationReviewPage">
        <NavLink to={"/"} className={"grayText"}>
          {t("main")}
        </NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <NavLink to={"/lessons/upcoming/1"} className={"grayText"}>
          {t("myLessons")}
        </NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p className={"grayText"}>{t("videoLesson")}</p>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("perforEval")}</p>
      </Box>
      <Box className="contentReviewPage">
        <form onSubmit={handleSubmit(submitReview)}>
          <p className="titleForm">{t("perforEvalTeacher")}</p>
          <Box className="reviewFieldBox ratingBox">
            <Rating
              value={watch("rating") || 0}
              emptyIcon={<StarIcon className="emptyIcon" />}
              icon={<StarIcon className="fillIcon" />}
              onChange={handleChangeRating}
            />
            <FormHelperText className="errorMessage">{errors?.rating?.message}</FormHelperText>
          </Box>
          {fields.map((el, ind) => (
            <Box key={ind} className="reviewFieldBox">
              <FormLabel className={`reviewLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
              <textarea
                placeholder={t("enterText")}
                {...register(el.name as Path<IReview>)}
                className={`reviewField reviewField_${ind + 1} ${el.error ? "errorField" : ""}`}
                maxLength={512}
              />
              <FormHelperText className="errorMessage">{el.error}</FormHelperText>
            </Box>
          ))}
          <Box className="submitButtonBox">
            <Button type="submit">{t("send")}</Button>
          </Box>
        </form>
        <img src={reviewPic} alt="review" className="reviewPict" />
      </Box>
    </Container>
  );
};

export default ReviewPage;
