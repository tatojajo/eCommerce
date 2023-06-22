import React, { useRef, useState } from 'react';
import { Box } from '@mui/system';
import { Settings, Logout } from '@mui/icons-material';
import { Button, Avatar, Typography, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';
import { useTranslation } from 'react-i18next';

const NewSignIn = () => {
    const [isSignInOpne, setIsSignInOpen] = useState<boolean>(false)
    const anchorRef = useRef<HTMLButtonElement>(null);
    const {t} = useTranslation()

    const handleClose = () => {
        
        setIsSignInOpen(false);
      };
  return (
    <Box>
      <Button
        ref={anchorRef}
        id="user-menu-button"
        aria-controls={isSignInOpne ? 'user menu' : undefined}
        aria-expanded={isSignInOpne ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() => {
          if (isAuthenticated().isUser) handleUserMenu();
        }}>
        <Avatar></Avatar>

        <Typography ml={1} variant="body2">
        
        </Typography>
      </Button>
      {isAuthenticated().isUser && (
        <Menu
          anchorEl={anchorRef.current}
          id="account-menu"
          open={isSignInOpne}
          onClose={handleClose}
          onClick={handleClose}
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
            //   isAuthenticated().isUser && navigate(`/user/${user.firstName}`);
            //   setisSignInOpne(false);
            }}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem 
        //   onClick={handleClose}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <MenuItem
            onClick={() => {
            //   handleLogout();
            //   navigate('/');
            }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t('global.logout')}
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default NewSignIn;
