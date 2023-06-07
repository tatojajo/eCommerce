import React, { useEffect, useState } from "react";
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
import { setSelectedBrandProducts } from "../Home/redux/HomeActions/HomeActions";

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
import { useTranslation } from "react-i18next";

const BrandPage = () => {
  const dispatch = useAppDispatch();
const {t} = useTranslation()
  const [brandItem, setBrandItem] = useState<string>("");
  const { selectedBrand, selectedBrandsProducts } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  useEffect(() => {
    const getSelectedBrandProducts = async () => {
      try {
        const { data } = await selectedBrandProducts(selectedBrand, brandItem);
        dispatch(setSelectedBrandProducts(data.products));
      } catch (error) {}
    };
    getSelectedBrandProducts();
  }, [selectedBrand, brandItem]);
  
  return (
    <BrandPageContainer>
      <BrandImageContainer>
        {mainBrands.map((brand) => {
          if (brand.brand === selectedBrand) {
            return (
              <BrandImage key={brand.brand} src={brand.img} alt={brand.brand} />
            );
          }
        })}
      </BrandImageContainer>
      <Box >
        <List sx={{ display: "flex", alignItems:'start',width: "300px" }}>
          <ListItem>
            <ListItemButton onClick={() => setBrandItem("")}>
              <ListItemAvatar>
                <AllInclusive />
              </ListItemAvatar>
              <ListItemText>{t('global.all')}</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setBrandItem("Mobile")}>
              <ListItemAvatar>
                <MobileFriendly />
              </ListItemAvatar>
              <ListItemText>{t('global.phone')}</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setBrandItem("tv")}>
              <ListItemAvatar>
                <Tv />
              </ListItemAvatar>
              <ListItemText>{t('global.tv')}</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setBrandItem("watch")}>
              <ListItemAvatar>
                <Watch />
              </ListItemAvatar>
              <ListItemText>{t('global.watch')}</ListItemText>
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
