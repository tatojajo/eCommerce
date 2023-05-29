import React, { useState } from "react";
import Products from "../Products";
import Customers from "../Customers";
import Dashboard from "../Dashboard";
import Orders from "../Order";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Page } from "../../../@types/adminPgae";

const pages: Page[] = [
  { name: "Dashboard", component: <Dashboard /> },
  { name: "Products", component: <Products /> },
  { name: "Customers", component: <Customers /> },
  { name: "Orders", component: <Orders /> },
];

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState<Page>(pages[1]);
  const handlePageClick = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          marginTop: "64px",
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {pages.map((page, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton onClick={() => handlePageClick(page)}>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {currentPage.component}
      </Box>
    </Box>
  );
};

export default Sidebar;
