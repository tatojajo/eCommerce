import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectedBrandProducts } from "../../Helpers/Services/products";
import mainBrands from "../../component/Brands/mainBrands";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { setSelectedBrandProducts } from "../../redux/HomeActions/HomeActions";

import {
  BrandPageContainer,
  BrandImageContainer,
  BrandImage,
  BrandProductsContainer,
} from "./BrandPageStyle";
import ProductCard from "../../component/ProductCard";
import {
  AllInbox,
  AllInclusive,
  MobileFriendly,
  Tv,
  Watch,
} from "@mui/icons-material";

const BrandPage = () => {
  const dispatch = useAppDispatch();
  const { selectedBrand, selectedBrandsProducts } = useAppSelector(
    (state) => state
  );

  useEffect(() => {
    const getSelectedBrandProducts = async () => {
      try {
        const { data } = await selectedBrandProducts(selectedBrand);
        dispatch(setSelectedBrandProducts(data.products));
      } catch (error) {}
    };
    getSelectedBrandProducts();
  }, [selectedBrand]);
  console.log(selectedBrandsProducts);
  return (
    <BrandPageContainer>
      <BrandImageContainer>
        {mainBrands.map((brand) => {
          if (brand.brand === selectedBrand) {
            return <BrandImage src={brand.img} alt={brand.brand} />;
          }
        })}
      </BrandImageContainer>
      <Box>
        <List sx={{ display: "flex", width: "300px" }}>
          <ListItem>
            <ListItemButton>
              <ListItemAvatar>
                <AllInclusive />
              </ListItemAvatar>
              <ListItemText>All</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemAvatar>
                <MobileFriendly />
              </ListItemAvatar>
              <ListItemText>Mobile</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemAvatar>
                <Tv />
              </ListItemAvatar>
              <ListItemText>Tv</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemAvatar>
                <Watch />
              </ListItemAvatar>
              <ListItemText>Watch</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

        <BrandProductsContainer>
          {selectedBrandsProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </BrandProductsContainer>
      </Box>
    </BrandPageContainer>
  );
};

export default BrandPage;
