import React, { FC, useRef, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  NativeSelect,
  Typography
} from '@mui/material';
import i18next, { t } from 'i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CustomDrawer } from './mobileMenuStyle';
import {
  ArrowDropDown,
  Category,
  Logout,
  Settings,
  ShoppingCart,
  Star,
  StarBorderOutlined,
  Storefront
} from '@mui/icons-material';
import {
  changePageNumber,
  saveSearchedProducts
} from '../../pages/Home/redux/HomeActions/HomeActions';
import { FavCartContainer, LogoTitle } from '../Header/HeaderStyle';
import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';
import { categories } from '../../component/Header/categories';
import mainBrands from '../Brands/mainBrands';

type MobileMenuProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Function;
  setIsSignInOpen: Function;
  setSearchValue: Function;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: Function;
  handleLogout: Function;
  setIsFavOpen: Function;
};

const MobileMenu: FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsSignInOpen,
  setSearchValue,
  // isUserMenuOpen,
  // setIsUserMenuOpen,
  handleLogout,
  setIsFavOpen
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<null | HTMLElement>(null);
  const categoryOpen = Boolean(category);
  // const [brand, setBrand] = useState<null | HTMLElement>(null);
  // const brandOpen = Boolean(brand);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favorites, cartItems } = useAppSelector<HomeState>((state) => state.homeReducer);

  const user: User = JSON.parse(localStorage.getItem('User') as string);
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };
  const handleUserMenu = () => {
    setIsUserMenuOpen(true);
  };
  const handleCategories = (event: React.MouseEvent<HTMLElement>) => {
    setCategory(event.currentTarget);
  };
  const handleCategoryClose = () => {
    setCategory(null);
  };
  // const handleBrand = (event: React.MouseEvent<HTMLElement>) => {
  //   setCategory(event.currentTarget);
  // };
  // const handleBradnClose = () => {
  //   setCategory(null);
  // };
  return (
    <CustomDrawer open={isMobileMenuOpen} onClose={handleCloseMobileMenu} anchor="left">
      <Box sx={{ width: '300px' }}>
        <LogoTitle
          onClick={() => {
            setIsMobileMenuOpen(false);
            dispatch(changePageNumber(1));
            setSearchValue('');
            dispatch(saveSearchedProducts([], 0));
            navigate('/');
          }}>
          <IconButton>
            <Storefront />
          </IconButton>
          <Typography variant="h2Montserrat" sx={{ cursor: 'pointer' }}>
            T-shop
          </Typography>
        </LogoTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderBottom: '1px solid',
            paddingBottom: '5px'
          }}>
          <Box
            display="flex"
            alignItems="center"
            onClick={() => {
              if (!isAuthenticated().isUser) setIsSignInOpen(true);
            }}>
            <Button
              ref={anchorRef}
              id="user-menu-button"
              aria-controls={isUserMenuOpen ? 'user menu' : undefined}
              aria-expanded={isUserMenuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={() => {
                if (isAuthenticated().isUser) handleUserMenu();
              }}>
              <Avatar>{user?.firstName[0]}</Avatar>

              <Typography ml={1} variant="body2">
                {user?.firstName}
              </Typography>
            </Button>
            {isAuthenticated().isUser && (
              <Menu
                anchorEl={anchorRef.current}
                id="account-menu"
                open={isUserMenuOpen}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                  elevation: 10,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem
                  onClick={() => {
                    isAuthenticated().isUser && navigate(`/user/${user?.firstName}`);
                    setIsMobileMenuOpen(false);
                  }}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                    navigate('/');
                  }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t('global.logout')}
                </MenuItem>
              </Menu>
            )}
          </Box>
          <Box sx={{ minWidth: 50 }}>
            <FormControl fullWidth>
              <NativeSelect
                title="Select Language"
                defaultValue="ENG"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'ENG') {
                    i18next.changeLanguage('en');
                    setIsMobileMenuOpen(false);
                  } else if (value === 'GEO') {
                    i18next.changeLanguage('ge');
                    setIsMobileMenuOpen(false);
                  }
                }}>
                <option value="ENG">ENG</option>
                <option value="GEO">GEO</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
        <FavCartContainer>
          <Box>
            <IconButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFavOpen(true);
                navigate('/?favorites');
              }}>
              <Badge badgeContent={favorites.length} color="success">
                {favorites.length > 0 ? <Star /> : <StarBorderOutlined />}
              </Badge>
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </FavCartContainer>
        <Divider />
        <Box sx={{ display: 'flex', padding: '30px', justifyContent: 'space-evenly' }}>
          <Box>
            <Button variant="outlined" color="primary" onClick={handleCategories}>
              Categories <ArrowDropDown />
            </Button>
            <Menu open={categoryOpen} onClose={handleCategoryClose} anchorEl={category}>
              {categories.map((category) => {
                return (
                  <MenuItem
                    key={category}
                    onClick={() => {
                      setCategory(null);
                      setIsMobileMenuOpen(false);
                      navigate(`/category/${category}`);
                    }}>
                    {category}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          {/* <Box>
            <Button variant="outlined" color="primary" onClick={handleBrand}>
              Brands <ArrowDropDown />
            </Button>
            <Menu open={brandOpen} onClose={handleBradnClose} anchorEl={brand}>
              {mainBrands.map((brand) => {
                return <MenuItem key={brand.brand}>{brand.brand}</MenuItem>;
              })}
            </Menu>
          </Box> */}
        </Box>
        <Divider />
      </Box>
    </CustomDrawer>
  );
};

export default MobileMenu;
