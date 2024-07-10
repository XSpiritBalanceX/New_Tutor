import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import StudentForm from "@components/registrationStudent/StudentForm";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const { user } = useParams();

  return (
    <Container className="registrationPageContainer">
      {user === "student" && <StudentForm />}
      {user === "teacher" && <div>teacher form</div>}
    </Container>
  );
};

export default RegistrationPage;
