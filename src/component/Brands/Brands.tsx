import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import mainBrands from "./mainBrands";
import { selectBrand } from "../../pages/Home/redux/HomeActions/HomeActions";
import { Box, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  BrandImage,
  BrandPaper,
  BrandsContainer,
  BrandsOwerFlow,
  CarousellArrowsLeft,
  CarousellArrowsRight,
  ImagesContainer,
} from "./BrandsStyles";

const Brands = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [brands, setBrands] = useState(mainBrands);
  const [brandIndex, setBrandIndex] = useState(0);

  const nextBrand = () => {
    setBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
  };

  const prevBrand = () => {
    setBrandIndex(
      (prevIndex) => (prevIndex - 1 + brands.length) % brands.length
    );
  };

  return (
    <BrandsContainer>
      <Box>
        <Typography variant="h1" color="initial">
          {t("global.the_ most_popular_brands")}
        </Typography>
      </Box>
      <BrandsOwerFlow>
        <CarousellArrowsLeft onClick={prevBrand}>
          <ArrowLeft />
        </CarousellArrowsLeft>
        <ImagesContainer>
          {brands.map((brand, index) => {
            return (
              <BrandPaper key={index}
                sx={{
                  opacity: brandIndex === index ? "1" : "0.5",
                  border: brandIndex === index ? "3px solid black" : "none",
                }}
                onClick={() => {
                  setBrandIndex(index);
                  dispatch(selectBrand(brand.brand));
                  navigate(`/brand?${brand.brand}`);
                }}
              >
                <BrandImage
                  key={brand.brand}
                  src={brand.img}
                  alt={brand.brand}
                />
              </BrandPaper>
            );
          })}
        </ImagesContainer>
        <CarousellArrowsRight onClick={nextBrand}>
          <ArrowRight />
        </CarousellArrowsRight>
      </BrandsOwerFlow>
    </BrandsContainer>
  );
};
export default Brands;
