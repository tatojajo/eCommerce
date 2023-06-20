import { styled, Box, Typography, Paper } from '@mui/material';

export const UserPageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 100px;
`;

export const UserPageTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 20px;
`;

export const UserInfoDetails = styled(Box)`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 20px;
`;

export const UserInfoPaper = styled(Paper)`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justifay-content: center;
`;

export const AddressDetailsContainer = styled(Paper)`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const UserAddress = styled(Box)`
width:100%;
  display: flex;
  flex-direction: column;
`;
