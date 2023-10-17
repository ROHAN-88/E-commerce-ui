import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
const HomeCardProduct = (props) => {
  const { _id,name, price, imageUrl } = props;
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ width: 320 }}>
        <div>
          {/* //!name */}
          <Typography level="title-lg">{name}</Typography>
          <Typography level="body-sm">April 24 to May 02, 2021</Typography>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          {/* //!imageUrl */}
          <img
            src={imageUrl}
            loading="lazy"
            alt=""
            style={{ objectFit: "contain" }}
          />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">Total price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {/* //!price */}${price}
            </Typography>
          </div>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={() => navigate(`/product/detail/${_id}`)}
          >
            Explore
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default HomeCardProduct;
