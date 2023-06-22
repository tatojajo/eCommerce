import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  ContactPage,
  Facebook,
  FavoriteRounded,
  Home,
  Info,
  Instagram,
  LinkedIn
} from '@mui/icons-material';
import { IconButton, ListItem, Typography } from '@mui/material';
import logo from '../../images/favicon.ico';
import { AppLinks, FooretIcons, FooterContainer, LogoTitleContainer } from './footerStyle';
import Favorites from '../../pages/Favorites';

// import Google from './GoogleMap'

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFavOpen, setIsFavOpne] = useState<boolean>(false);
  return (
    <FooterContainer>
      <LogoTitleContainer>
        <img src={logo} alt="T-Shop" width="30px" />
        <Typography variant="h2Montserrat">T-Shop</Typography>
      </LogoTitleContainer>
      <AppLinks>
        <ListItem>
          <FooretIcons onClick={() => navigate('/')}>
            <Home sx={{ fontSize: '24px' }} color="info" />
            {t('global.home')}
          </FooretIcons>
        </ListItem>

        <ListItem>
          <FooretIcons onClick={() => navigate('/contact')}>
            <ContactPage sx={{ fontSize: '24px' }} color="primary" />
            {t('global.contact us')}
          </FooretIcons>
        </ListItem>

        <ListItem>
          <FooretIcons>
            <Info sx={{ fontSize: '24px' }} color="warning" />
            {t('global.about')}
          </FooretIcons>
        </ListItem>

        <ListItem>
          <FooretIcons onClick={() => setIsFavOpne(true)}>
            <FavoriteRounded sx={{ fontSize: '24px' }} color="error" />
            {t('global.favorites')}
          </FooretIcons>
        </ListItem>
      </AppLinks>
      <AppLinks>
        <ListItem>
          <IconButton>
            <Facebook color="info" />
          </IconButton>
        </ListItem>

        <ListItem>
          <IconButton>
            <Instagram color="error" />
          </IconButton>
        </ListItem>

        <ListItem>
          <IconButton>
            <LinkedIn color="info" />
          </IconButton>
        </ListItem>
      </AppLinks>
      <AppLinks>
        <Typography variant="h3Montserrat" color="initial">
          &copy; 2023 T-Shop, All rights reserved
        </Typography>
      </AppLinks>
      {isFavOpen && <Favorites isFavOpen={isFavOpen} setIsFavOpen={setIsFavOpne} />}
    </FooterContainer>
  );
};

export default Footer;
