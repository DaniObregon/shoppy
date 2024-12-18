import React from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
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
