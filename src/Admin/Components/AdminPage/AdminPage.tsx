import React, { useState } from 'react';
import Products from '../Products';

import Dashboard from '../Dashboard';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { Page } from '../../../@types/adminPgae';
import NewProduct from '../NewProduct';
import { useAppDispatch } from '../../../redux/hooks';
import { getAllBrands } from '../../helpers/products';
import { saveBrands } from '../../Redux/action';
import { useNavigate } from 'react-router-dom';

const pages: Page[] = [
  { name: 'Dashboard', component: <Dashboard /> },
  { name: 'Products', component: <Products /> },
  { name: 'New Product', component: <NewProduct /> }
];

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState<Page>(pages[1]);
  const handlePageClick = (page: Page) => {
    setCurrentPage(page);
  };
  const dispatch = useAppDispatch();

  const getBrands = async () => {
    const { data } = await getAllBrands();
    dispatch(saveBrands(data.brands));
  };
  getBrands();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          marginTop: '64px',
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '64px'
          }
        }}
        variant="permanent"
        anchor="left">
        <List>
          {pages.map((page, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    handlePageClick(page);
                  }}>
                  <ListItemIcon>
                    <ListItemText>{page.name}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 9 }}>
        {currentPage.component}
      </Box>
    </Box>
  );
};

export default AdminPage;
