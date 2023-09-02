import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getBuyerProduct } from "../../../lib/product.api";
import BuyerCard from "./BuyerCard";
const BuyerProduct = () => {
  // const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const getPaginationData = (event, data) => {
    setPage(data);
  };
  // const fetchProducts = async () => {
  //   try {
  //     const response = await $axios.post("/product/buyer/all", {
  //       page: 1,
  //       limit: 10,
  //     });

  //     console.log(response.data);
  //     setProducts(response.data);
  //   } catch (e) {
  //     // console.log({ message: e.response.data });
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  //!Query

  const { error, data, isLoading } = useQuery({
    queryKey: ["buyer-product", page],
    queryFn: () => getBuyerProduct({ page: page, limit: 8 }),
  });

  // console.log(data);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      {data?.data?.map((item, index, self) => {
        // console.log(item);
        return <BuyerCard key={index} {...item} />;
      })}

      <div
        style={{
          // border: "1px red solid",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          page={page}
          count={10}
          color="secondary"
          variant="outline"
          onChange={getPaginationData}
        />
      </div>
    </div>
  );
};

export default BuyerProduct;
