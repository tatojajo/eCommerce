import { styled, Drawer } from '@mui/material';

export const CustomDrawer = styled(Drawer)`
  margin-top: 64px;
  width: 240px;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: 350px;
    padding: 20px;
    box-sizing: border-box;
  }
`;
