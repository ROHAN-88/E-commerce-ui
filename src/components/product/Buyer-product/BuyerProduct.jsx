import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getBuyerProduct } from "../../../lib/product.api";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import NoItemFound from "../../noItemFound/NoItemFound";
const BuyerProduct = (props) => {
  // const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const getPaginationData = (event, data) => {
    setPage(data);
  };

  //!calling fillter redux
  const { minPrice, maxPrice, searchText, category } = useSelector(
    (state) => state.product
  );
  //!Query
  const dispatch = useDispatch();
  const { error, data, isLoading } = useQuery({
    queryKey: [
      "buyer-product",
      { page, searchText, minPrice, maxPrice, category },
    ],
    queryFn: () =>
      getBuyerProduct({
        page: page,
        limit: 9,
        searchText: searchText || "",
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 0,
        category: category || [],
      }),
    onError: (error) => {
      dispatch(
        openErrorSnackbar(
          error?.response?.data?.message || "Products cannot be fetched."
        )
      );
    },
  });

  // console.log(data);

  return (
    <>
      {data?.data?.length === 0 ? (
        <NoItemFound message="Product Not Found" />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {data?.data?.product?.map((item, index, self) => {
            return <ProductCard key={index} {...item} />;
          })}

          <div
            style={{
              // border: "1px red solid",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <Pagination
              page={page}
              // count={data?.data.totalPage}
              count={data?.data?.totalPage}
              color="secondary"
              variant="outline"
              onChange={getPaginationData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerProduct;
