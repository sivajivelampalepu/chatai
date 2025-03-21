import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Tooltip, Switch } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../Store/themeSlice';

const Header = () => {
    const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#26A69A',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ChatIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 1 }}
            >
              Chat Application
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: '#E0F7FA', fontStyle: 'italic' }}
            >
              Your Friendly AI Companion
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
          <Typography sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 'bold' }}>
            Dark Mode
          </Typography>
          <Switch checked={mode === "dark"} onChange={() => dispatch(toggleTheme())} />
          <Tooltip title="User Profile">
            <IconButton
              sx={{
                '&:hover': {
                  bgcolor: '#2BBBAD',
                  transition: 'background-color 0.3s',
                },
              }}
            >
              <Avatar sx={{ bgcolor: '#FFFFFF', color: '#26A69A' }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;