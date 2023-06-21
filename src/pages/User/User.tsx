import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Details from './Details';

import { LocalMall, PersonOutline, Place } from '@mui/icons-material';
import { Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { UserInfoDetails, UserInfoPaper, UserPageContainer, UserPageTitle } from './UserPageStyle';
import Address from './Address';
import Orders from '../../Admin/Components/Order';
import ReservedProducts from './RedervedProducts';

const User = () => {
  const [selectedInfo, setSelectedInfo] = useState('My Details');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectedInfo = (info: string) => {
    setSelectedInfo(info);
    navigate(`?selected=${encodeURIComponent(info)}`, { replace: true });
  };
  return (
    <UserPageContainer>
      <UserPageTitle variant="h4" color="initial">
        {t('global.my_acount')}
      </UserPageTitle>
      <UserInfoDetails>
        <Box>
          <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleSelectedInfo('My Details');
              }}>
              <ListItemAvatar>
                <PersonOutline />
              </ListItemAvatar>
              <ListItemText primary={t('global.my_details')} />
            </ListItem>
            <ListItem
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleSelectedInfo('My Address');
              }}>
              <ListItemAvatar>
                <Place />
              </ListItemAvatar>
              <ListItemText primary={t('global.my_address')} />
            </ListItem>
            <ListItem
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleSelectedInfo('Reserved Products');
              }}>
              <ListItemAvatar>
                <LocalMall />
              </ListItemAvatar>
              <ListItemText primary={`${t('global.reserved')} ${t('global.product')}`} />
            </ListItem>
          </List>
        </Box>
        <UserInfoPaper sx={{ width: '70%' }}>
          {(() => {
            if (selectedInfo === 'My Details') {
              return <Details />;
            }
            if (selectedInfo === 'My Address') {
              return <Address />;
            }
            if (selectedInfo === 'Reserved Products') {
              return <ReservedProducts />;
            }
          })()}
        </UserInfoPaper>
      </UserInfoDetails>
    </UserPageContainer>
  );
};

export default User;
