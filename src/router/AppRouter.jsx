import { Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "../app/routes";
import { AuthRoutes } from "../auth/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<AppRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
