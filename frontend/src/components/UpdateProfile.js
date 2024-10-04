// frontend/src/components/UpdateProfile.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';

function UpdateProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [initialValues, setInitialValues] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  // Fix missing state variables
  const [formValues, setFormValues] = useState({
    location: '',
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLocationChange = async (event, newValue) => {
    setFormValues({ ...formValues, location: newValue });
    if (newValue && newValue.length > 3) {
      try {
        const response = await axiosInstance.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: newValue,
            format: 'json',
            addressdetails: 1,
            limit: 5,
          },
        });
        setLocationOptions(response.data);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setLocationOptions([]);
    }
  };

  const handleLocationSelect = (event, newValue) => {
    setFormValues({ ...formValues, location: newValue });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/profile');
        setInitialValues({
          userType: res.data.userType || '',
          username: res.data.username || '',
          firstName: res.data.firstName || '',
          lastName: res.data.lastName || '',
          dateOfBirth: res.data.dateOfBirth || null,
          phoneNumber: res.data.phoneNumber || '',
          company: res.data.company || '',
          jobTitle: res.data.jobTitle || '',
          personalLinkedIn: res.data.personalLinkedIn || '',
          personalTwitter: res.data.personalTwitter || '',
          personalTelegram: res.data.personalTelegram || '',
          dateStartedMining: res.data.dateStartedMining || null,
          companyName: res.data.companyName || '',
          description: res.data.description || '',
          companyWebsite: res.data.companyWebsite || '',
          companyAddress: res.data.companyAddress || '',
          companyLinkedIn: res.data.companyLinkedIn || '',
          companyTwitter: res.data.companyTwitter || '',
          companyTelegram: res.data.companyTelegram || '',
          companyLogo: res.data.companyLogo || '',
        });
        setIsLoaded(true); // Set loading to true once data is fetched
      } catch (err) {
        setError('Failed to load profile data');
      }
    };
    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      userType: '',
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      phoneNumber: '',
      company: '',
      jobTitle: '',
      personalLinkedIn: '',
      personalTwitter: '',
      personalTelegram: '',
      dateStartedMining: null,
      companyName: '',
      companyWebsite: '',
      companyAddress: '',
      companyLinkedIn: '',
      companyTwitter: '',
      companyTelegram: '',
      companyLogo: '',
      description: '', // Added description to formik's initial values
    },

    validationSchema: Yup.object({
      userType: Yup.string().required('Required'),
      // Add validation for other fields if needed
    }),
    
    onSubmit: async (values) => {
      try {
        const updatedValues = { ...values };
        if (companyLogo) {
          updatedValues.companyLogo = companyLogo;
        }

        await axiosInstance.put('/api/auth/profile', updatedValues);

        navigate('/profile');
      } catch (err) {
        setError(err.response?.data?.msg || 'An error occurred');
      }
    },
  });

  if (!initialValues || !isLoaded) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      formik.setFieldValue('companyAddress', place.formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleCompanyLogoChange = (event) => {
    if (event.currentTarget.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.currentTarget.files[0]);
        reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        setCompanyLogo(base64String);
        };
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h4" align="center" gutterBottom>
              Update Profile
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
              {/* User Type Selection */}
              <TextField
                select
                label="User Type"
                name="userType"
                fullWidth
                margin="normal"
                required
                value={formik.values.userType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userType && Boolean(formik.errors.userType)}
                helperText={formik.touched.userType && formik.errors.userType}
              >
                <MenuItem value="Individual Miner">Individual Miner</MenuItem>
                <MenuItem value="Mining Company">Mining Company</MenuItem>
                <MenuItem value="Hosting Provider">Hosting Provider</MenuItem>
              </TextField>

              {/* Conditional Rendering Based on User Type */}
              {formik.values.userType === 'Individual Miner' && (
                <>
                  {/* Individual Miner Fields */}
                  <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={formik.values.username || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* First Name */}
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    margin="normal"
                    value={formik.values.firstName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Last Name */}
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    margin="normal"
                    value={formik.values.lastName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Date of Birth */}
                  <DatePicker
                    label="Date of Birth"
                    value={formik.values.dateOfBirth || null}
                    onChange={(value) => formik.setFieldValue('dateOfBirth', value)}
                    renderInput={(params) => (
                      <TextField {...params} name="dateOfBirth" fullWidth margin="normal" />
                    )}
                  />
                  {/* Phone Number */}
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    fullWidth
                    margin="normal"
                    value={formik.values.phoneNumber || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Company */}
                  <TextField
                    label="Company"
                    name="company"
                    fullWidth
                    margin="normal"
                    value={formik.values.company || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Job Title */}
                  <TextField
                    label="Job Title"
                    name="jobTitle"
                    fullWidth
                    margin="normal"
                    value={formik.values.jobTitle || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Personal LinkedIn Profile */}
                  <TextField
                    label="Personal LinkedIn Profile"
                    name="personalLinkedIn"
                    fullWidth
                    margin="normal"
                    value={formik.values.personalLinkedIn || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Personal Twitter Profile */}
                  <TextField
                    label="Personal Twitter Profile"
                    name="personalTwitter"
                    fullWidth
                    margin="normal"
                    value={formik.values.personalTwitter || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Personal Telegram Handle */}
                  <TextField
                    label="Personal Telegram Handle"
                    name="personalTelegram"
                    fullWidth
                    margin="normal"
                    value={formik.values.personalTelegram || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Date Started Mining */}
                  <DatePicker
                    label="Date Started Mining"
                    value={formik.values.dateStartedMining || null}
                    onChange={(value) => formik.setFieldValue('dateStartedMining', value)}
                    renderInput={(params) => (
                      <TextField {...params} name="dateStartedMining" fullWidth margin="normal" />
                    )}
                  />
                </>
              )}

              {(formik.values.userType === 'Mining Company' ||
                formik.values.userType === 'Hosting Provider') && (
                <>
                  {/* Company Name */}
                  <TextField
                    label="Company Name"
                    name="companyName"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Company Logo Upload */}
                  <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Upload Company Logo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleCompanyLogoChange}
                    />
                  </Button>
                  {companyLogo && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Company logo uploaded
                    </Typography>
                  )}
                  {/* Company Website */}
                  <TextField
                    label="Company Website"
                    name="companyWebsite"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyWebsite || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Company Address Autocomplete */}
                  {isLoaded && (

                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={locationOptions.map((option) => option.display_name)}
                    value={formValues.location}
                    onInputChange={handleLocationChange}
                    onChange={handleLocationSelect}
                    renderInput={(params) => (
                        <TextField {...params} label="Company Address" margin="normal" />
                    )}
                  />
                  )}
                  {/* Company LinkedIn Profile */}
                  <TextField
                    label="Company LinkedIn Profile"
                    name="companyLinkedIn"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyLinkedIn || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Company Twitter Profile */}
                  <TextField
                    label="Company Twitter Profile"
                    name="companyTwitter"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyTwitter || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* Company Telegram Handle */}
                  <TextField
                    label="Company Telegram Handle"
                    name="companyTelegram"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyTelegram || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </>
              )}

              {/* Description Field */}
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={formik.values.description}
                onChange={formik.handleChange}
              />

              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default UpdateProfile;
