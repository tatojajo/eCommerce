import { styled, Card, } from "@mui/material";
import { Link } from "react-router-dom";

export const CardContainer = styled(Card)`
  max-width: 210px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
  font-size: 12px;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;
`;
