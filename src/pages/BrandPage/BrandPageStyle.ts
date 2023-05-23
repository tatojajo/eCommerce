import { styled, Box } from "@mui/material";

export const BrandPageContainer = styled(Box)`
  width: 100%;
  margin-top:20px;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BrandImageContainer = styled(Box)`
  width: 80%;
  object-fit:cover;
  padding:20px;
  display:flex;
  align-items:center;
  justify-content: center;
  background-color:#FCEADE;
  border-radius:20px
`;

export const BrandImage  = styled('img')`
width:80%;

`


export const BrandProductsContainer = styled(Box)`
gap: 3rem;
  width: 70%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
`