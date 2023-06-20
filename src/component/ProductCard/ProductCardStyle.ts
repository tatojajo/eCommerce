import { styled, Card, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export const CardContainer = styled(Card)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  @media (max-width: 900px) {
  }

  @media (max-width: 600px) {
  }
`;

export const ProductLink = styled(Link)`
  min-height: 100px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 900;
`;

export const CardBts = styled(CardActions)`
  width: 80%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`;
