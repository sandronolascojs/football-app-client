import { Routes, Route, Navigate } from "react-router-dom";
import { AccountPage, HomePage, VotePage } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/home/vote" element={<VotePage />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
