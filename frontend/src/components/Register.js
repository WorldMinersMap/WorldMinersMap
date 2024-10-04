// frontend/src/components/Register.js

import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
import { AuthContext } from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      userType: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { name, email, password, userType } = values;
        const res = await axios.post('/api/auth/register', {
          name,
          email,
          password,
          userType,
        });
        login(res.data.token); // Update authentication state
        navigate('/dashboard'); // Redirect to the dashboard page
      } catch (err) {
        setError(err.response?.data?.msg || 'An error occurred');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, backgroundColor: theme.palette.background.paper }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              type="text"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: { color: theme.palette.text.primary },
              }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: { color: theme.palette.text.primary },
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: { color: theme.palette.text.primary },
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: { color: theme.palette.text.primary },
              }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <TextField
              select
              label="User Type"
              name="userType"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: { color: theme.palette.text.primary },
              }}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: theme.palette.primary.main }}>
              Sign in here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
