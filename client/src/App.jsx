import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage"; // Tu única página por ahora
import { AdminPanelPage } from "./pages/AdminPanelPage";
import { ProductDescriptionPage } from "./pages/ProductDescription";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/product/:id" element={<ProductDescriptionPage />} />
      </Routes>
    </Router>
  );
};
