import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Loader";
import { getSellerProduct } from "../../../lib/product.api";
// import SellerCard from "./SellerCard";
import ProductCard from "../ProductCard";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Sellerproduct = (props) => {
  const selector = useSelector((state) => state.product);
  //navigation
  const navigate = useNavigate();
  //pagiantion
  const [page, setPage] = useState(1);
  const getPaginationData = (event, data) => {
    setPage(data);
  };
  //query
  const { error, data, isLoading } = useQuery({
    queryKey: [
      "seller-product",
      { page, searchText: props?.searchText, isDeleted: selector.isDeleted },
    ],
    queryFn: () =>
      getSellerProduct({ page: page, limit: 8, searchText: props?.searchText }),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
          marginRight: "2rem",
        }}
      >
        <Button
          onClick={() => navigate("/product/add")}
          style={{ marginRight: "3rem" }}
          variant="contained"
        >
          Add Product
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "3rem",
        }}
      >
        {data?.data?.map((item, index) => {
          return <ProductCard key={index} {...item} />;
        })}
      </div>

      <div
        style={{
          // border: "1px red solid",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5rem",
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
    </>
  );
};

export default Sellerproduct;
