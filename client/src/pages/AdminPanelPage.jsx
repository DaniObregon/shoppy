import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AdminPanelPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/")}>Regresar a MainPage</Button>
    </div>
  );
};