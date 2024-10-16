import React from "react";
import logo from "../assets/butterfly-02.png";
import { useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";

export const Logo = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/logo-navigation");
  };
  return (
    <Image
      src={logo}
      alt="Logo"
      boxSize="50px"
      marginLeft={3}
      marginRight={-5}
      cursor="pointer"
      onClick={handleNavigate}
      
    />
  );
};
