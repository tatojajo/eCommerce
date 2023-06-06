import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { isAuthenticated } from "../../../Helpers/Auth/isAuthenticated";
import { getProductList } from "../../Requests/products";
import { saveProductsList } from "../../Redux/action";

import {
  Box,
  Typography,
  Button,
  Paper,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DeleteForever, Edit, Search } from "@mui/icons-material";

const TruncatedText = ({ text, maxLength }: any) => {
  const [truncated, setTruncated] = useState(true);

  const toggleTruncated = () => {
    setTruncated(!truncated);
  };

  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <Box>
      <span>{truncated ? truncatedText : text}</span>
      {text.length > maxLength && (
        <Button variant="text" onClick={toggleTruncated}>
          {truncated ? "Read More" : "Read Less"}
        </Button>
      )}
    </Box>
  );
};

const Products = () => {
  const { isAdmin } = isAuthenticated();
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.adminReducer);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await getProductList();
      dispatch(saveProductsList(data.products));
    };
    getAllProducts();
  }, [isAdmin]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" color="initial">
          Products
        </Typography>
        <TextField
          fullWidth
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button color="success">Add New Products</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row" padding="checkbox">
                  <Checkbox
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", gap: 1 }}
                >
                  <Avatar alt="Remy Sharp" src={product.images[0]} />
                  <TruncatedText text={product.title} maxLength={10} />
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <DeleteForever />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{product.brand}</TableCell>

                <TableCell align="right">
                  <strong>$</strong> {Number(product.price).toFixed(2)}
                </TableCell>
                <TableCell align="right">{product.amount}</TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
