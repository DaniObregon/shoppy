import React from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Carousel } from "../components/Carousel";
import { ProductList } from "../components/ProductList";

export const MainPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Carousel />
      <ProductList />
    </>
  );
};
