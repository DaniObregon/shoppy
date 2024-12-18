import React from "react";
import { AdminPanel } from "../components/admin-panel/AdminPanel";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

export const AdminPanelPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <AdminPanel />
    </>
  );
};
