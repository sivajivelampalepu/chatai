import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#26A69A', color: '#FFFFFF', p: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Chat Application. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;