// frontend/src/App.js

import React, { useContext, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { AuthContext } from './context/AuthContext';
import axiosInstance from './utils/axiosInstance';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import Donate from './components/Donate';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackFormValues, setFeedbackFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    navigate('/dashboard');
  };

  const handleFeedbackClick = () => {
    setFeedbackOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
    setFeedbackFormValues({
      name: '',
      email: '',
      message: '',
    });
    setSubmitted(false);
  };

  const handleFeedbackChange = (e) => {
    setFeedbackFormValues({
      ...feedbackFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axiosInstance.post('/api/feedback', feedbackFormValues);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit feedback', err);
    }
  };

  return (
    <>
      <AppBar position="static" color="default" sx={{ backgroundColor: 'background.paper' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Bitcoin Miners Map
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard" sx={{ color: 'text.primary' }}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/donate" sx={{ color: 'text.primary' }}>
            Donate
          </Button>
          <Button color="inherit" component={Link} to="/aboutus" sx={{ color: 'text.primary' }}>
            About Us
          </Button>
          <Button color="inherit" onClick={handleFeedbackClick} sx={{ color: 'text.primary' }}>
            Feedback
          </Button>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/register" sx={{ color: 'text.primary' }}>
                Register
              </Button>
              <Button color="inherit" component={Link} to="/login" sx={{ color: 'text.primary' }}>
                Login
              </Button>
            </>
          ) : (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenu}
                sx={{ color: 'text.primary' }}
              >
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    handleCloseMenu();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onClose={handleFeedbackClose}>
        <DialogTitle>Submit Feedback</DialogTitle>
        <DialogContent>
          {submitted ? (
            <Typography variant="body1">Thank you for your feedback!</Typography>
          ) : (
            <>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={feedbackFormValues.name}
                onChange={handleFeedbackChange}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={feedbackFormValues.email}
                onChange={handleFeedbackChange}
              />
              <TextField
                label="Message"
                name="message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={feedbackFormValues.message}
                onChange={handleFeedbackChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackClose}>Close</Button>
          {!submitted && (
            <Button onClick={handleFeedbackSubmit} variant="contained" color="primary">
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        {/* Add other routes as needed */}
      </Routes>
    </>
  );
}

export default App;
