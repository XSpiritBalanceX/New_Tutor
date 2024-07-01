import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouterForLogged from "./ProtectedRouterForLogged";
import AuthPage from "@pages/auth/AuthPage";

const RouterComponent = () => {
  const unprotectedRoutes = [
    { path: "/login", element: <AuthPage /> },
    { path: "/registration", element: <AuthPage /> },
  ];

  const protectedRoutes = [{ path: "", element: <div></div> }];
  return (
    <Routes>
      {unprotectedRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={el.element} />
      ))}
      {protectedRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouterForLogged>{el.element}</ProtectedRouterForLogged>} />
      ))}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default RouterComponent;
