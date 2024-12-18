import React from "react";
import { AdminPanel } from "../components/admin-panel/AdminPanel";
import { Header } from "../components/main-page/Header";
import { Navbar } from "../components/main-page/Navbar";

export const AdminPanelPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <AdminPanel />
    </>
  );
};
