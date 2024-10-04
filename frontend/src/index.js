

// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'leaflet/dist/leaflet.css';
import './setupLeaflet';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF8C00', // Dark orange color
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#1E1E1E', // Slightly lighter background for cards and forms
    },
    text: {
      primary: '#FFFFFF', // White text for primary content
      secondary: '#B0B0B0', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </AuthProvider>
  </ThemeProvider>
);
