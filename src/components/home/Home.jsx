// import React, { useEffect } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import HomeCardProduct from "./HomeCardProduct";
// import "./home.css";
// import { useQuery } from "react-query";
// import { lastestProduct } from "../../lib/product.api";
// import Loader from "../../Loader";

// const Home = () => {
//   //!query
//   const { error, data, isLoading } = useQuery({
//     queryKey: ["latestProduct"],
//     queryFn: () => lastestProduct(10),
//   });
//   //====
//   const productData = data?.data;

//   if (isLoading) {
//     <Loader />;
//   }
//   //====

//   //! owl coursole
//   const option = {
//     item: 2,
//     loop: true,
//     center: true,
//     autoplay: false,
//     // autoplayTimeout: 4000,
//     // animateOut: "slideOutUp",
//     nav: false,
//     dots: true,
//     margin: 0,
//     responsive: {
//       600: {
//         items: 4,
//       },
//     },
//   };
//   return (
//     <>
//       <div>
//         <h1 style={{ marginLeft: "5rem", color: "#DF2E38" }}>Latest Product</h1>
//         <div className="home-top-category">
//           <OwlCarousel className="owl-theme" {...option}>
//             {productData?.map((items) => {
//               return (
//                 <HomeCardProduct
//                   key={items._id}
//                   {...items}
//                   className="item  "
//                 />
//               );
//             })}
//           </OwlCarousel>
//         </div>

//         <h2>how</h2>
//         {/* category  */}
//         {productData?.category == "kitchen" && (
//           <div>
//             <OwlCarousel className="owl-theme" {...option}>
//               {productData?.map((items) => {
//                 return (
//                   <HomeCardProduct
//                     key={items._id}
//                     {...items}
//                     className="item  "
//                   />
//                 );
//               })}
//             </OwlCarousel>
//           </div>
//         )}
//         {console.log(productData)}
//       </div>
//     </>
//   );
// };
//!================================= up is my code down in chatgtp code
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HomeCardProduct from "./HomeCardProduct";
import "./home.css";
import { useQuery } from "react-query";
import { lastestProduct } from "../../lib/product.api";
import Loader from "../../Loader";

const Home = () => {
  const [kitchenData, setKitchenData] = useState([]);
  const [electronicsData, setElectronicsData] = useState([]);
  const [clothingData, setClothingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (category, setData) => {
    try {
      const response = await lastestProduct(10, { category });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch data for different categories
      await fetchProducts("kitchen", setKitchenData);
      await fetchProducts("electronics", setElectronicsData);
      await fetchProducts("clothing", setClothingData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderCards = (data) => {
    return (
      <OwlCarousel className="owl-theme" {...option}>
        {data.map((item) => (
          <HomeCardProduct key={item._id} {...item} className="item" />
        ))}
      </OwlCarousel>
    );
  };

  const option = {
    item: 2,
    loop: true,
    center: true,
    autoplay: false,
    nav: false,
    dots: true,
    margin: 0,
    responsive: {
      600: {
        items: 4,
      },
    },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <div>
          <h1
            style={{
              marginLeft: "5rem",
              color: "#DF2E38",
              textAlign: "center",
            }}
            className="card-head"
          >
            Latest Products
          </h1>
        </div>

        {/* Kitchen Category */}
        <div className="home-top-category">
          <h1
            style={{
              marginLeft: "5rem",
              color: "black",
              textAlign: "center",
            }}
            className="card-head"
          >
            Kitchen
          </h1>
          {renderCards(kitchenData)}
        </div>

        {/* Electronics Category */}
        <div className="home-top-category">
          <h1
            style={{
              marginLeft: "5rem",
              color: "black",
              textAlign: "center",
            }}
            className="card-head"
          >
            Electronics
          </h1>
          {renderCards(electronicsData)}
        </div>

        {/* Clothing Category */}
        <div className="home-top-category">
          <h1
            style={{
              marginLeft: "5rem",
              color: "black",
              textAlign: "center",
            }}
            className="card-head"
          >
            Clothing
          </h1>
          {renderCards(clothingData)}
        </div>
      </div>
    </>
  );
};

export default Home;
