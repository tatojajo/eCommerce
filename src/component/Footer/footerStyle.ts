import { Box, IconButton, List, styled } from '@mui/material';

export const FooterContainer = styled(Box)`
  width: 100%;
  height: 150x;
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
  border-top: 2px solid;
  margin-top:10px;
  align-items: center;
  overflow-x: hidden;
`;

export const LogoTitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const AppLinks = styled(List)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooretIcons = styled(IconButton)`
  @media (max-width: 745px) {
    font-size: 15px;
  }
  @media (max-width: 470px) {
    font-size: 10px;
  }
`;
