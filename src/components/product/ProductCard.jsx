import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteSellerProduct } from "../../lib/product.api";
import "./ProductCard.css";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsProductDeleted } from "../../store/productSlice";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //!props
  const { _id, color, category, company, price, name } = props;

  //!get role from local storage
  const userRole = localStorage.getItem("role");

  const queryClient = useQueryClient();
  //!popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //!mutation
  const deleteProduct = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => deleteSellerProduct(_id),
    onSuccess: () => {
      // queryClient.invalidateQueries("seller-product");
      dispatch(setIsProductDeleted());
      //todo error fix: not reloading when product deleted
      //error fixed with browser change
    },
    // onError: {},
  });

  if (deleteProduct.isLoading) {
    return <Loader />;
  }

  return (
    <div className="seller-card">
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ borderRadius: "5rem" }}>
          <Typography sx={{ p: 2 }}>Do You want to Delete</Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => {
                handleClose();
                deleteProduct.mutate();
              }}
            >
              yes
            </button>

            <button onClick={() => handleClose()}>No</button>
          </div>
        </div>
      </Popover>
      <Card sx={{ maxWidth: 345, borderRadius: "10px" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/img//Screenshot (166).png"
        />
        <CardContent>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="h6" color={"#4682a9"}>
              {company}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          {userRole === "seller" && (
            <Button size="small" variant="contained" onClick={handleClick}>
              Delete
            </Button>
          )}

          {userRole === "buyer" && (
            <Button variant="contained">Add to Cart </Button>
          )}

          <Button
            size="small"
            onClick={() => navigate(`/product/detail/${_id}`)}
          >
            Expoler
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
