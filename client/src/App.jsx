import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage"; // Tu única página por ahora

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Aquí puedes agregar más rutas en el futuro */}
      </Routes>
    </Router>
  );
};
