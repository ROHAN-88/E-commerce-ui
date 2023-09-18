import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Loader";
// import SellerCard from "./SellerCard";
import ProductCard from "../ProductCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSellerProduct } from "../../../lib/product.api";

const Sellerproduct = () => {
  const { searchText } = useSelector((state) => state.product);

  //!dispatch
  // const dispatch = useDispatch();
  //navigation
  const navigate = useNavigate();
  //pagiantion
  const [page, setPage] = useState(1);
  const getPaginationData = (event, data) => {
    setPage(data);
  };
  //query
  const { error, data, isLoading } = useQuery({
    queryKey: ["seller-product", { page, searchText: searchText }],
    queryFn: () =>
      getSellerProduct({ page: page, limit: 8, searchText: searchText }),
  });

  console.log(data);
  console.log(data);
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
          return <ProductCard key={item._id} {...item} />;
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
