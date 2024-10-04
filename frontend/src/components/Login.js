// frontend/src/components/Login.js

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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/auth/login', values);
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
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: theme.palette.primary.main }}>
              Register here
            </Link>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link to="/reset-password" style={{ color: theme.palette.primary.main }}>
              Forgot your password?
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
