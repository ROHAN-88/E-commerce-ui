import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HomeCardProduct from "./HomeCardProduct";
import "./home.css";

const Home = () => {
  const option = {
    item: 2,
    loop: true,
    center: true,
    autoplay: true,
    autoplayTimeout: 4000,
    animateOut: "slideOutUp",
    nav: false,
    dots: false,
    margin: 0,
    responsive: {
      600: {
        items: 4,
      },
    },
  };
  return (
    <>
      <div className="home-top-category">
        <OwlCarousel className="owl-theme" {...option}>
          {product.map((item, index) => {
            return <HomeCardProduct key={index} {...item} className="item  " />;
          })}
        </OwlCarousel>
      </div>
    </>
  );
};

export default Home;
