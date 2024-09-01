import { Header } from "./components/Header";
import { Carousel } from "./components/Carousel";
import { ProductList } from "./components/ProductList";
import Navbar from "./components/Navbar";

export const App = () => {
  return (
    <>
      <Header />;
      <Navbar />
      <Carousel />
      <ProductList />
    </>
  );
};
