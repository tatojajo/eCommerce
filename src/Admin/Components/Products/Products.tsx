import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { isAuthenticated } from '../../../Helpers/Auth/isAuthenticated';
import { useTranslation } from 'react-i18next';
import { getProductList } from '../../helpers/products';
import { saveProductsList, saveSearchedProductList, setEditabelProduct } from '../../Redux/action';

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
  Pagination,
  Stack
} from '@mui/material';
import { ArrowLeft, ArrowRight, DeleteForever, Edit, Search } from '@mui/icons-material';
import { t } from 'i18next';
import useDebounce from '../../../Helpers/CustomHooks/useBoolean/useDebounce';
import EditProduct from './Edit';
import DeleteProduct from './Delete';

const TruncatedText = ({ text, maxLength }: any) => {
  const [truncated, setTruncated] = useState(true);
  const { t } = useTranslation();

  const toggleTruncated = () => {
    setTruncated(!truncated);
  };

  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return (
    <Box>
      <span>{truncated ? truncatedText : text}</span>
      {text.length > maxLength && (
        <Button variant="text" onClick={toggleTruncated}>
          {truncated ? 'Read More' : 'Read Less'}
        </Button>
      )}
    </Box>
  );
};

const Products = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const debounceValue = useDebounce(searchValue);
  const { isAdmin } = isAuthenticated();
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector<AdminState>((state) => state.adminReducer);
  const startIndex = (pageNumber - 1) * 20;

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceValue === '') setPageNumber(1);
    setSearchValue(e.target.value);
  };

  const prevPage = () => {
    if (pageNumber === 0) return;
    setPageNumber((prev) => prev - 1);
  };
  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  console.log(startIndex);
  useEffect(() => {
    let isCanceled = false;
    const getAllProducts = async () => {
      const { data } = await getProductList(debounceValue, startIndex);
      setTotalProducts(data.total_found);
      if (!isCanceled && debounceValue === '') dispatch(saveProductsList(data.products));
      if (!isCanceled && debounceValue)
        dispatch(saveSearchedProductList(data.products, data.total_found));
    };
    if (!isCanceled) getAllProducts();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    return () => {
      isCanceled = true;
    };
  }, [isAdmin, debounceValue, startIndex, pageNumber]);
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Typography variant="h3Montserrat" color="initial">
          {t('global.product')}
        </Typography>

        <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
          <TextField
            id="search"
            type="search"
            label="Search"
            // value={searchTerm}
            onChange={handleChangeValue}
            sx={{ width: 400 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Container>
        {/* <Button variant='outlined' color="success">Add New Products</Button> */}
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
                    'aria-label': 'select all desserts'
                  }}
                />
              </TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
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
                      'aria-label': 'select all desserts'
                    }}
                  />
                </TableCell>

                <TableCell component="th" scope="row" sx={{ display: 'flex', gap: 1 }}>
                  <Avatar alt="Remy Sharp" src={product.images[0]} />
                  <TruncatedText text={product.title} maxLength={10} />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setConfirmDelete(true);
                      setProductToDelete(product);
                    }}>
                    <DeleteForever />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setIsEditingOpen(true), dispatch(setEditabelProduct(product));
                    }}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{product.brand}</TableCell>

                <TableCell align="right">
                  <strong>$</strong> {Number(product.price).toFixed(2)}
                </TableCell>
                <TableCell align="right">{product.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isEditingOpen && (
          <EditProduct isEditingOpen={isEditingOpen} setIsEditingOpen={setIsEditingOpen} />
        )}
        {confirmDelete && (
          <DeleteProduct
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            product={productToDelete}
          />
        )}
        {!debounceValue && (
          <Stack spacing={2} mt={4}>
            <Pagination
              count={Math.ceil(totalProducts / 20)}
              page={pageNumber}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        )}
        {debounceValue && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '20px 20px'
            }}>
            <Button variant="outlined" onClick={prevPage}>
              <ArrowLeft />
              Back
            </Button>
            {allProducts.length > 0 ? (
              <Typography variant="h6" color="initial">
                Page: {pageNumber}
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
