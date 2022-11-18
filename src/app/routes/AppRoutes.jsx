import { Routes, Route, Navigate } from "react-router-dom";
import { AccountPage, HomePage } from "../pages";
import VerifyEmailPage from "../pages/VerifyEmailPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/verify" element={<VerifyEmailPage />}/>
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
