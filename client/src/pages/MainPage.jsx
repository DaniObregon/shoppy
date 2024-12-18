import React from "react";
import { Navbar } from "../components/main-page/Navbar";
import { Header } from "../components/main-page/Header";
import { Carousel } from "../components/main-page/Carousel";
import { ProductList } from "../components/main-page/ProductList";

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
