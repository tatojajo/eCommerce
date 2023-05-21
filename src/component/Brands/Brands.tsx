import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import mainBrands from "./mainBrands";
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
              <BrandPaper
                sx={{
                  opacity: brandIndex === index ? "1" : "0.5",
                  border: brandIndex === index ? "3px solid black" : "none",
                }}
                onClick={() => setBrandIndex(index)}
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
