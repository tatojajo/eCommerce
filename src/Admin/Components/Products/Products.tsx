import React, { useState, useEffect, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { isAuthenticated } from "../../../Helpers/Auth/isAuthenticated";
import { useTranslation } from "react-i18next";
import { getProductList } from "../../helpers/products";
import { saveProductsList, saveSearchedProductList } from "../../Redux/action";

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
  Container,
} from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  DeleteForever,
  Edit,
  Search,
} from "@mui/icons-material";
import { t } from "i18next";
import useDebounce from "../../../Helpers/CustomHooks/useBoolean/useDebounce";
import EditProduct from "./Edit";

const TruncatedText = ({ text, maxLength }: any) => {
  const [truncated, setTruncated] = useState(true);
  const { t } = useTranslation();

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
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceValue = useDebounce(searchValue);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { isAdmin } = isAuthenticated();
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.adminReducer);
  const startIndex = pageNumber * 20;

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceValue === "") setPageNumber(0);
    setSearchValue(e.target.value);
  };

  const prevPage = () => {
    if (pageNumber === 0) return;
    setPageNumber((prev) => prev - 1);
  };
  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    let isCanceled = false;
    const getAllProducts = async () => {
      const { data } = await getProductList(debounceValue, startIndex);
      if (!isCanceled && debounceValue === "")
        dispatch(saveProductsList(data.products));
      if (!isCanceled && debounceValue)
        dispatch(saveSearchedProductList(data.products, data.total_found));
    };
    if (!isCanceled) getAllProducts();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return () => {
      isCanceled = true;
    };
  }, [isAdmin, debounceValue, startIndex]);
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
          {t("global.products")}
        </Typography>

        <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
          <TextField
            id="search"
            type="search"
            label="Search"
            // value={searchTerm}
            onChange={handleChangeValue}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Container>
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
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
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
                  <IconButton onClick={()=>{
                    return <EditProduct product={product}/> 
                  }}>
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
        {debounceValue && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px 20px",
            }}
          >
            <Button variant="outlined" onClick={prevPage}>
              <ArrowLeft />
              Back
            </Button>
            {allProducts.length > 0 ? (
              <Typography variant="h6" color="initial">
                Page: {pageNumber + 1}
              </Typography>
            ) : (
              <Typography variant="h6" color="error">
                No Products Found!
              </Typography>
            )}
            <Button variant="outlined" onClick={nextPage}>
              Next
              <ArrowRight />
            </Button>
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default Products;
