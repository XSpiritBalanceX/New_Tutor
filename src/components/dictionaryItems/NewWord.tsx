import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  TextField,
  InputAdornment,
} from "@mui/material";
import { translate } from "@i18n";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ControlledInput from "@components/fields/ControlledInput";
import ControlledSelect from "@components/fields/ControlledSelect";
import { WordsTypes } from "@pages/dictionary/TypesDictionary";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { capitalizeFirstLetter } from "@utils/dictionaryFunctions";
import { useNavigate } from "react-router-dom";
import "./DictionaryItems.scss";

interface INewWord {
  word: string;
  type: string;
  translation: string;
  description?: string;
  folder: string;
}

interface INewWordProps {
  folders: string[];
}

const NewWord = ({ folders }: INewWordProps) => {
  const { t } = translate("translate", { keyPrefix: "dictionaryPage" });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dictionary");
  };

  const validationSchema = Yup.object().shape({
    word: Yup.string().required(t("errReqField")),
    type: Yup.string().required(t("errWordType")),
    translation: Yup.string().required(t("errReqField")),
    description: Yup.string(),
    folder: Yup.string().required(t("errReqField")),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<INewWord>({
    resolver: yupResolver(validationSchema),
  });

  const handleAddNewWord = (data: INewWord) => {
    console.log(data);
  };

  const handleChangeWordType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("type", e.currentTarget.value);
  };

  const wordsFolders = folders.reduce((acc, category) => {
    if (category === "all_words") {
      acc[category] = t("allWords");
    } else if (category === "favorites") {
      acc[category] = t("favorites");
    } else {
      acc[category] = capitalizeFirstLetter(category);
    }
    return acc;
  }, {} as Record<string, string>);

  const watchFields = watch(["word", "translation", "folder", "type"]);
  const isButtonDisabled = !watchFields[0] || !watchFields[1] || !watchFields[2] || !watchFields[3];

  return (
    <Box className="newWordBox">
      <Box className="controlBox">
        <p>{t("addNewWord")}</p>
        <Button type="button" onClick={handleNavigate}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <form onSubmit={handleSubmit(handleAddNewWord)}>
        <ControlledInput control={control} name="word" placeholder={t("word")} error={errors?.word?.message} />
        <Box className="typesOfWordBox">
          <RadioGroup onChange={handleChangeWordType} className="typesRadioGroup">
            {Array(5)
              .fill(null)
              .map((_, ind) => (
                <FormControlLabel
                  key={ind}
                  value={ind + 1}
                  control={<Radio className="radioTypesWord" />}
                  label={WordsTypes[ind + 1]}
                  className="itemTypesWord"
                />
              ))}
          </RadioGroup>
          <FormHelperText className="errorMessage">{errors?.type?.message}</FormHelperText>
        </Box>
        <ControlledInput
          control={control}
          name="translation"
          placeholder={t("translation")}
          error={errors?.translation?.message}
        />
        <Box>
          <Controller
            name={"description"}
            control={control}
            defaultValue={""}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  multiline
                  rows={5}
                  error={!!errors.description}
                  placeholder={t("addDescription")}
                  className={`controlledField descriptionField`}
                  InputProps={{
                    endAdornment: !!errors.description && (
                      <InputAdornment position="end" className="errorIcon">
                        <WarningAmberRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />
          <FormHelperText className="errorMessage">{errors?.description?.message}</FormHelperText>
        </Box>
        <ControlledSelect
          control={control}
          name="folder"
          error={errors?.folder?.message}
          options={Object.values(wordsFolders)}
          defaultOption={"0"}
        />
        <Button type="submit" className="submitButton" disabled={isButtonDisabled}>
          {t("save")}
        </Button>
      </form>
    </Box>
  );
};

export default NewWord;
