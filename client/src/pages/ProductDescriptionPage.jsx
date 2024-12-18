import React from "react";
import { Header } from "../components/main-page/Header";
import { Navbar } from "../components/main-page/Navbar";
import { ProductDetails } from "../components/product-description-page/ProductDetails";

export const ProductDescriptionPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <ProductDetails />
    </>
  );
};
