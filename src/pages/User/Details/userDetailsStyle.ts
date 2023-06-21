import { Box, styled } from '@mui/material';

export const UserDetailsContiner = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: 830px) {
    flex-direction: column;
  }
`;
export const UserText = styled(Box)`
  max-width: 200px;
  @media (max-width: 830px) {
    max-width: 500px;
    margin-bottom:10px
  }
`;
