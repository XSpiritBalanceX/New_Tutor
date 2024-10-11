import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouterForLogged from "./ProtectedRouterForLogged";
import ProtectedRouter from "./ProtectedRouter";
import MainPage from "@pages/main/MainPage";
import AuthPage from "@pages/auth/AuthPage";
import RegistrationPage from "@pages/registration/RegistrationPage";
import ProfilePage from "@pages/profile/ProfilePage";
import SearchPage from "@pages/search/SearchPage";
import TeacherPage from "@pages/teacher/TeacherPage";
import AllLessonsPage from "@pages/allLessons/AllLessonsPage";
import StudentPage from "@pages/student/StudentPage";
import AboutUsPage from "@pages/aboutUs/AboutUsPage";
import AskQuestionPage from "@pages/askQuestion/AskQuestionPage";
import InviteFriendPage from "@pages/inviteFriend/InviteFriendPage";
import ReviewPage from "@pages/review/ReviewPage";
import TermsPage from "@pages/terms/TermsPage";
import PolicyPage from "@pages/policy/PolicyPage";
import ResetPasswordPage from "@pages/resetPassword/ResetPasswordPage";
import VideoLessonPage from "@pages/videoLesson/VideoLessonPage";
import DictionaryPage from "@pages/dictionary/DictionaryPage";

const RouterComponent = () => {
  const unprotectedRoutes = [
    { path: "/", element: <MainPage /> },
    { path: "/search/:page", element: <SearchPage /> },
    { path: "/teacher/:id", element: <TeacherPage /> },
    { path: "/aboutus", element: <AboutUsPage /> },
    { path: "/askquestion", element: <AskQuestionPage /> },
    { path: "/terms", element: <TermsPage /> },
    { path: "/policy", element: <PolicyPage /> },
  ];

  const unauthRoutes = [
    { path: "/login", element: <AuthPage /> },
    { path: "/registration", element: <AuthPage /> },
    { path: "/forgotpassword", element: <ResetPasswordPage /> },
    { path: "/resetpassword", element: <ResetPasswordPage /> },
  ];

  const authRoutes = [
    { path: "/registration/:user", element: <RegistrationPage /> },
    { path: "/registration/teacher/schedule", element: <RegistrationPage /> },
    { path: "/profile/:element", element: <ProfilePage /> },
    { path: "/lessons/:page", element: <AllLessonsPage /> },
    { path: "/student/:id", element: <StudentPage /> },
    { path: "/invitation", element: <InviteFriendPage /> },
    { path: "/review", element: <ReviewPage /> },
    { path: "/video_lesson/:lesson_time", element: <VideoLessonPage /> },
    { path: "/dictionary", element: <DictionaryPage /> },
    { path: "/dictionary/new_word", element: <DictionaryPage /> },
    { path: "/dictionary/new_folder", element: <DictionaryPage /> },
    { path: "/dictionary/:name_folder/:page", element: <DictionaryPage /> },
  ];

  return (
    <Routes>
      {unprotectedRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={el.element} />
      ))}
      {unauthRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouterForLogged>{el.element}</ProtectedRouterForLogged>} />
      ))}
      {authRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouter>{el.element}</ProtectedRouter>} />
      ))}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default RouterComponent;
