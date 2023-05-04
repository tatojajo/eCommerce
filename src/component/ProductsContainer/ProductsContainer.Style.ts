import { styled, Box } from "@mui/material";

export const MainContainer = styled("div")`
  width:100%,
  display:flex;
  align-items:center;
  justify-content:center;
  background: #ff5f5;
`;
export const ProductContainer = styled("div")`
  // display: grid;
  // grid-template-columns: repeat(4, 1fr);
  // align-items: center;
  // justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
`;

export const ProductCard = styled("div")`
  display: block;
  border-radius: 5px;
  background-color: #fff;
  border: solid 1px #f5f5f5;
  position: relative;
`;
