import { Box, Button, FormLabel, FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { translate } from "@i18n";
import { InputMask } from "@react-input/mask";
import ControlledInput from "@components/fields/ControlledInput";
import moment from "moment";
import "./SettingPayments.scss";

interface INewBankCard {
  number_card: string;
  name_card: string;
  exp_date_month: string;
  exp_date_year: string;
  cvc: string;
}

const NewBankCard = () => {
  const { t } = translate("translate", { keyPrefix: "settingPaymentsPage" });

  const validationSchema = Yup.object().shape({
    number_card: Yup.string().required(t("reqField")).min(19, t("reqField")),
    name_card: Yup.string().required(t("reqField")),
    exp_date_month: Yup.string()
      .required(t("reqField"))
      .test("format", t("errCard"), (value, ctx) => {
        const currentDate = moment();
        const valueDate = moment(`${value}-${ctx.parent.exp_date_year}`, "MM-YY");
        return valueDate.isAfter(currentDate) ? true : ctx.createError();
      }),
    exp_date_year: Yup.string()
      .required(t("reqField"))
      .test("format", t("errCard"), (value, ctx) => {
        const currentDate = moment();
        const valueDate = moment(`${ctx.parent.exp_date_month}-${value}`, "MM-YY");
        return valueDate.isAfter(currentDate) ? true : ctx.createError();
      }),
    cvc: Yup.string()
      .required(t("reqField"))
      .min(3, t("errLengthCVC"))
      .max(3, t("errLengthCVC"))
      .matches(/^\d+$/, t("errNumber")),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<INewBankCard>({
    resolver: yupResolver(validationSchema),
  });

  const submitNewCard = (data: INewBankCard) => {
    console.log(data);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue("number_card", value);
  };

  return (
    <Box className="newBankCardBox">
      <form onSubmit={handleSubmit(submitNewCard)}>
        <Box className="cardWrapper">
          <Box className="frontSideCard">
            <Box className="newBankCardField">
              <FormLabel className={`newCardLabel`}>{t("numberPfCard")}</FormLabel>
              <InputMask
                mask="____ ____ ____ ____"
                replacement={{ _: /\d/ }}
                placeholder={"XXXX-XXXX-XXXX-XXXX"}
                className={`numberField ${errors.number_card ? "errorField" : ""}`}
                onChange={handleChangeNumber}
                value={watch("number_card") ?? ""}
              />
              <FormHelperText className="errorMessage">{errors.number_card?.message}</FormHelperText>
            </Box>
            <Box className="newBankCardField">
              <FormLabel className={`newCardLabel`}>{t("nameOfOwner")}</FormLabel>
              <ControlledInput
                control={control}
                name="name_card"
                error={errors?.name_card?.message}
                placeholder={t("firstLastName").toUpperCase()}
              />
            </Box>
            <Box className="newBankCardField">
              <FormLabel className={`newCardLabel`}>{t("validity")}</FormLabel>
              <Box className="expDateBox">
                <ControlledInput
                  control={control}
                  name="exp_date_month"
                  error={errors?.exp_date_month?.message}
                  placeholder={"MM"}
                  classNameField="expDateField"
                />
                <ControlledInput
                  control={control}
                  name="exp_date_year"
                  error={errors?.exp_date_year?.message}
                  placeholder={t("yearLab").toUpperCase()}
                  classNameField="expDateField"
                />
              </Box>
            </Box>
          </Box>
          <Box className="backSideCard">
            <Box className="blackLine" />
            <Box className="newBankCardField">
              <FormLabel className={`newCardLabel`}>{"CVC"}</FormLabel>
              <ControlledInput control={control} name="cvc" error={errors?.cvc?.message} placeholder="***" />
            </Box>
          </Box>
        </Box>
        <Box className="submitButtonBox">
          <Button type="submit">{t("add")}</Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewBankCard;
