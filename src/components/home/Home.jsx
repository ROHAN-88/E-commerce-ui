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
// Importing necessary parts from React and other libraries
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HomeCardProduct from "./HomeCardProduct";
import "./home.css";
import { useQuery } from "react-query";
import { lastestProduct } from "../../lib/product.api";
import Loader from "../../Loader";

// Creating a component named Home
const Home = () => {
  // State to hold data for different categories
  const [kitchenData, setKitchenData] = useState([]);
  const [electronicsData, setElectronicsData] = useState([]);
  const [clothingData, setClothingData] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch products based on category
  const fetchProducts = async (category, setData) => {
    try {
      // Trying to get product data from the server
      const response = await lastestProduct(10, { category });
      // Updating the state with the received data
      setData(response.data);
    } catch (error) {
      // If there's an error, log it to the console
      console.error("Error fetching products:", error);
    }
  };

  // useEffect is like a helper that does something when the component is shown on the screen
  useEffect(() => {
    // Inside useEffect, we're doing some tasks
    const fetchData = async () => {
      // Setting loading to true to show a loading spinner
      setIsLoading(true);

      // Fetching data for different categories
      await fetchProducts("kitchen", setKitchenData);
      await fetchProducts("electronics", setElectronicsData);
      await fetchProducts("clothing", setClothingData);
      await fetchProducts("vehicle", setVehicle);

      // After fetching, setting loading to false to hide the spinner
      setIsLoading(false);
    };

    // Calling the fetchData function
    fetchData();
    // The empty array [] means this useEffect runs only once when the component is first shown
  }, []);

  // Function to render OwlCarousel with HomeCardProduct items
  const renderCards = (data) => {
    return (
      // Using OwlCarousel to create a nice sliding effect
      <OwlCarousel className="owl-theme" {...option}>
        {/* Mapping through data and creating HomeCardProduct for each item */}
        {data.map((item) => (
          <HomeCardProduct key={item._id} {...item} className="item" />
        ))}
      </OwlCarousel>
    );
  };

  // Configuration options for OwlCarousel
  const option = {
    item: 2,
    loop: true,
    center: true,
    autoplay: false,
    nav: false,
    dots: false,
    margin: 0,
    responsive: {
      600: {
        items: 4,
      },
    },
  };

  // If still loading, show a loading spinner
  if (isLoading) {
    return <Loader />;
  }

  // Once data is loaded, render the component
  return (
    // Returning the JSX (HTML-like code) to be displayed on the screen
    <>
      <div>
        <div>
          {/* Heading for the latest products */}
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
          {/* Render Kitchen category cards */}
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
          {/* Render Electronics category cards */}
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
          {/* Render Clothing category cards */}
          {renderCards(clothingData)}
        </div>

        {/* vehicle  */}
        <div className="home-top-category">
          <h1
            style={{
              marginLeft: "5rem",
              color: "black",
              textAlign: "center",
            }}
            className="card-head"
          >
            Vehicle
          </h1>
          {/* Render Clothing category cards */}
          {renderCards(vehicle)}
        </div>
      </div>
    </>
  );
};

// Exporting the Home component to be used in other parts of the app
export default Home;
