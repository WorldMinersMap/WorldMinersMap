// frontend/src/components/Donate.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Donate() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Support Our Project
        </Typography>
        <Typography variant="body1" paragraph>
          This project is developed and maintained by an individual passionate about increasing visibility and transparency in the mining industry. Your support is greatly appreciated and helps in maintaining and improving the platform.
        </Typography>
        <Typography variant="body1" paragraph>
          If you would like to donate, you can do so using Bitcoin:
        </Typography>
        <Typography variant="h6">
          Bitcoin Address: <code>xxx</code>
        </Typography>
      </Box>
    </Container>
  );
}

export default Donate;
