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

const RouterComponent = () => {
  const unprotectedRoutes = [
    { path: "/", element: <MainPage /> },
    { path: "/search/:page", element: <SearchPage /> },
    { path: "/teacher/:id", element: <TeacherPage /> },
  ];

  const unauthRoutes = [
    { path: "/login", element: <AuthPage /> },
    { path: "/registration", element: <AuthPage /> },
  ];

  const authRoutes = [
    { path: "/registration/:user", element: <RegistrationPage /> },
    { path: "/registration/teacher/schedule", element: <RegistrationPage /> },
    { path: "/profile/:element", element: <ProfilePage /> },
    { path: "/lessons/:page", element: <AllLessonsPage /> },
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
