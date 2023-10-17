import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HomeCardProduct from "./HomeCardProduct";
import "./home.css";
import { useQuery } from "react-query";
import { lastestProduct } from "../../lib/product.api";

const Home = () => {
  //!query
  const { error, data } = useQuery({
    queryKey: ["latestProduct"],
    queryFn: () => lastestProduct(10),
  });
  //====
  const productData = data?.data;
  //====
  //! owl coursole
  const option = {
    item: 2,
    loop: true,
    center: true,
    autoplay: false,
    // autoplayTimeout: 4000,
    // animateOut: "slideOutUp",
    nav: false,
    dots: true,
    margin: 0,
    responsive: {
      600: {
        items: 4,
      },
    },
  };
  return (
    <>
      <div>
        <h1 style={{ marginLeft: "5rem", color: "#DF2E38" }}>
          {" "}
          Latest Product{" "}
        </h1>
        <div className="home-top-category">
          <OwlCarousel className="owl-theme" {...option}>
            {productData?.map((items) => {
              return (
                <HomeCardProduct
                  key={items._id}
                  {...items}
                  className="item  "
                />
              );
            })}
          </OwlCarousel>
        </div>

        <h2>how</h2>
        {/* category  */}
        {productData?.category == "kitchen" && (
          <div>
            <OwlCarousel className="owl-theme" {...option}>
              {productData?.map((items) => {
                return (
                  <HomeCardProduct
                    key={items._id}
                    {...items}
                    className="item  "
                  />
                );
              })}
            </OwlCarousel>
          </div>
        )}
        {console.log(productData)}
      </div>
    </>
  );
};

export default Home;
