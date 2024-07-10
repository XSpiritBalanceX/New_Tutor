import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const { user } = useParams();

  return (
    <Container className="registrationPageContainer">
      {user === "student" && <div>student form</div>}
      {user === "teacher" && <div>teacher form</div>}
    </Container>
  );
};

export default RegistrationPage;
