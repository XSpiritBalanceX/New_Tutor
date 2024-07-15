import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import StudentForm from "@components/registrationStudent/StudentForm";
import TeacherForm from "@components/registrationTeacher/TeacherForm";
import { translate } from "@i18n";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const { pathname } = useLocation();

  return (
    <Container className="registrationPageContainer">
      <p className="titleRegister">{t("registration")}</p>
      {pathname.includes("student") && <StudentForm />}
      {pathname.includes("teacher") && <TeacherForm />}
    </Container>
  );
};

export default RegistrationPage;
