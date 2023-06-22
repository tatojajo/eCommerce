import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../Helpers/CustomHooks/useBoolean/useDebounce';

// * Mui component
import {
  AppBar,
  Typography,
  IconButton,
  Box,
  Badge,
  FormControl,
  NativeSelect,
  Button,
  Container,
  Avatar,
  MenuItem,
  Divider,
  ListItemIcon,
  Menu
} from '@mui/material';
// *  styles
import {
  FavCartContainer,
  HeaderWraper,
  LogoTitle,
  SearchIconWrapper,
  SearchInput,
  StyledInputBase,
  UserContainer
} from './HeaderStyle';

// * icons
import {
  Search as SearchIcon,
  ShoppingCart,
  Logout,
  Menu as MenuIcon,
  Settings,
  Storefront,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import i18next from 'i18next';
import { useRef, useState } from 'react';
import {
  changePageNumber,
  saveSearchedProducts
} from '../../pages/Home/redux/HomeActions/HomeActions';
import SignIn from '../../pages/SignIn';
import Search from '../Search/Search';
import Favorites from '../../pages/Favorites';
import BreadCrumbs from '../BreadCrumbs';
import MobileMenu from '../MobileMenu';

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const debouncedValue = useDebounce(searchValue);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, favorites } = useAppSelector<HomeState>((state) => state.homeReducer);

  const handleUserMenu = () => {
    setIsUserMenuOpen(true);
  };
  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const user: User = JSON.parse(localStorage.getItem('User') as string);

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('User');
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <AppBar position="sticky" color="secondary" style={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <HeaderWraper>
          <LogoTitle
            sx={{ display: { xs: 'none', md: 'flex' } }}
            onClick={() => {
              dispatch(changePageNumber(1));
              setSearchValue('');
              dispatch(saveSearchedProducts([], 0));
              navigate('/');
            }}>
            <IconButton>
              <Storefront />
            </IconButton>
            <Typography variant="h1Montserrat" sx={{ cursor: 'pointer' }}>
              T-shop
            </Typography>
          </LogoTitle>

          <Box>
            <IconButton
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                width: '100px'
              }}
              onClick={() => setIsMobileMenuOpen(true)}>
              <MenuIcon sx={{ fontSize: '30px' }} />

              <Typography variant="h3Montserrat" sx={{ cursor: 'pointer' }}>
                T-shop
              </Typography>
            </IconButton>
            <MobileMenu
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              setIsSignInOpen={setIsSignInOpen}
              setSearchValue={setSearchValue}
              isUserMenuOpen={isUserMenuOpen}
              setIsUserMenuOpen={setIsUserMenuOpen}
              handleLogout={handleLogout}
              setIsFavOpen={setIsFavOpen}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <SearchInput>
              <form onSubmit={handleSubmit}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder={`${t('global.search')}...`}
                />
              </form>
            </SearchInput>
          </Box>

          <Box
            sx={{
              minWidth: 50,
              display: { xs: 'none', sm: 'flex' }
            }}>
            <FormControl fullWidth>
              <NativeSelect
                title="Select Language"
                defaultValue="ENG"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'ENG') {
                    i18next.changeLanguage('en');
                  } else if (value === 'GEO') {
                    i18next.changeLanguage('ge');
                  }
                }}>
                <option value="ENG">ENG</option>
                <option value="GEO">GEO</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <UserContainer>
            <FavCartContainer sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Box >
                <IconButton
                  onClick={() => {
                    setIsFavOpen(true);
                    navigate('/?favorites');
                  }}>
                  <Badge badgeContent={favorites.length} color="success">
                    {favorites.length > 0 ? <Favorite /> : <FavoriteBorder />}
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

            <Box
              sx={{ display: { xs: 'none', sm: 'flex' } }}
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
                      isAuthenticated().isUser && navigate(`/user/${user.firstName}`);
                      setIsUserMenuOpen(false);
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
            <SignIn isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} />
          </UserContainer>
          <Box sx={{ display: { xs: 'block', sm: 'none' }, marginRight: '10px' }}>
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </HeaderWraper>
      </Container>
      <BreadCrumbs />
      <Box
        sx={{
          display: debouncedValue.length === 0 ? 'none' : 'block',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'start',
          flexDirection: 'column',
          position: 'fixed',
          top: '99px',
          left: '50%',
          transform: ' translate(-50%, 0%)',
          zIndex: 1,
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '20px'
        }}
        onClick={() => setSearchValue('')}>
        {searchValue && <Search debouncedValue={debouncedValue} />}
      </Box>
      {isFavOpen && <Favorites isFavOpen={isFavOpen} setIsFavOpen={setIsFavOpen} />}
    </AppBar>
  );
};

export default Header;
