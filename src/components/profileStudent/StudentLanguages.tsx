import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IStudentLanguagesProps } from "./TypesProfileStudent";
import StudentRow from "@components/studentRow/StudentRow";
import { translate } from "@i18n";

const StudentLanguages = ({
  control,
  countOfLanguage,
  errors,
  watch,
  cbHandleCountOfRow,
  cbHandleDeleteLanguage,
}: IStudentLanguagesProps) => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const handleIncreaseRow = () => {
    cbHandleCountOfRow(countOfLanguage + 1);
  };

  const handleDecreaseRow = (id: number) => {
    cbHandleDeleteLanguage(id);
  };

  const studentFormRow: Array<JSX.Element> = Array(countOfLanguage)
    .fill(null)
    .map((_, ind) => (
      <StudentRow
        key={["StudentRow", ind].join("_")}
        id={ind}
        errors={errors}
        control={control}
        watch={watch}
        cbHandleDeleteLanguage={handleDecreaseRow}
      />
    ));

  return (
    <>
      {studentFormRow}
      <Box className="addLanguagesButtonBox">
        <Button type="button" onClick={handleIncreaseRow}>
          <AddIcon />
        </Button>
        <p>{t("addLanguageLearning")}</p>
      </Box>
    </>
  );
};

export default StudentLanguages;
