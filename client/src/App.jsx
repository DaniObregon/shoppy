import { Header } from "./components/Header";
import { Carousel } from "./components/Carousel";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";

export const App = () => {
  return (
    <>
      <Header />;
      <Navbar />
      <Carousel />
      <Card />
    </>
  );
};
