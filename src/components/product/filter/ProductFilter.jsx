import {
  Box,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setFilter } from "../../../store/productSlice";

const productCategories = [
  "grocery",
  "kitchen",
  "clothing",
  "electronics",
  "furniture",
  "cosmetics",
  "bakery",
  "liquor",
  "vehicle",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function ProductFilter() {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState([]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleClickOpen} variant="contained">
        Filter
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography sx={{ fontSize: "1.5rem" }}>Product Filter</Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ minPrice: 0, maxPrice: 0, category: [] }}
            validationSchema={Yup.object({
              minPrice: Yup.number().min(0, "Min price cannot be less than 0"),
              maxPrice: Yup.number().min(0, "Max price cannot be less than 0"),
              category: Yup.array().of(Yup.string()),
            })}
            onSubmit={(values) => {
              values.category = categoryName;
              dispatch(setFilter(values));
            }}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                id="filter-product-form"
                style={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Min price
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">Rs.</InputAdornment>
                    }
                    label="Min price"
                    {...formik.getFieldProps("minPrice")}
                  />
                </FormControl>
                {formik.touched.minPrice && formik.errors.minPrice ? (
                  <div>{formik.errors.minPrice}</div>
                ) : null}

                <FormControl sx={{ width: "100%" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Max price
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    type="number"
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">Rs.</InputAdornment>
                    }
                    label="Max price"
                    {...formik.getFieldProps("maxPrice")}
                  />
                </FormControl>
                {formik.touched.maxPrice && formik.errors.maxPrice ? (
                  <div>{formik.errors.maxPrice}</div>
                ) : null}

                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Category
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={categoryName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Category" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {productCategories.map((product, index) => (
                      <MenuItem key={index} value={product}>
                        <Checkbox
                          checked={categoryName.indexOf(product) > -1}
                        />
                        <ListItemText primary={product} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.category && formik.errors.category ? (
                  <div className="error-message">{formik.errors.category}</div>
                ) : null}
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions sx={{ margin: "1.5rem" }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            form="filter-product-form"
            color="success"
            onClick={handleClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
