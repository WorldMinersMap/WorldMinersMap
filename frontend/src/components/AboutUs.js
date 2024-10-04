// frontend/src/components/AboutUs.js

import React from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

function AboutUs() {
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/feedback', formValues);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit feedback', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our platform! We are dedicated to increasing visibility and transparency in the mining industry. Our goal is to provide a centralized place where individual miners, mining companies, and hosting providers can connect, share information, and find hosting services.
        </Typography>
        <Typography variant="body1" paragraph>
          We believe that by bringing together all participants in the industry, we can foster collaboration, share knowledge, and promote best practices.
        </Typography>
        {/* Feedback Form */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            We'd Love to Hear from You!
          </Typography>
          {submitted ? (
            <Typography variant="body1">Thank you for your feedback!</Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={formValues.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={formValues.email}
                onChange={handleChange}
              />
              <TextField
                label="Message"
                name="message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formValues.message}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default AboutUs;
