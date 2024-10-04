import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import countries from 'i18n-iso-countries';

// Load country data for ISO conversion
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));


function Profile() {
  const [userData, setUserData] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [miners, setMiners] = useState([]);
  const [openMinerDialog, setOpenMinerDialog] = useState(false);
  const [openFacilityDialog, setOpenFacilityDialog] = useState(false);
  const [minerFormValues, setMinerFormValues] = useState({
    manufacturer: '',
    variant: '',
    hashrate: '',
    numberOfDevices: '',
    location: '',
    latitude: null,
    longitude: null,
  });
  const [facilityFormValues, setFacilityFormValues] = useState({
    type: '',
    location: '',
    description: '',
    totalHashrate: '',
    totalEnergizedMiners: '',
    totalCapacity: '',
    latitude: null,
    longitude: null,
  });
  const [editingMinerIndex, setEditingMinerIndex] = useState(null);
  const [editingFacilityIndex, setEditingFacilityIndex] = useState(null);
  const [minerLocationOptions, setMinerLocationOptions] = useState([]);
  const [facilityLocationOptions, setFacilityLocationOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/profile');
        setUserData(res.data);
        setFacilities(res.data.facilities || []);
        setMiners(res.data.miners || []);
      } catch (err) {
                if (err.response && err.response.status === 401) {
          // Token expired or unauthorized, redirect to login
          localStorage.removeItem('token'); // Clear token
          navigate('/login'); // Redirect to login page
        } else {
          console.error('Failed to load profile data', err);
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleAddMiner = () => {
    setOpenMinerDialog(true);
  };

  const handleAddFacility = () => {
    setOpenFacilityDialog(true);
  };

  const handleEditMiner = (index) => {
    const miner = miners[index];
    setMinerFormValues({ ...miner });
    setEditingMinerIndex(index);
    setOpenMinerDialog(true);
  };

  const handleEditFacility = (index) => {
    const facility = facilities[index];
    setFacilityFormValues({ ...facility });
    setEditingFacilityIndex(index);
    setOpenFacilityDialog(true);
  };

  const handleMinerSubmit = async () => {
    const updatedMiners = [...miners];
    
    if (editingMinerIndex !== null) {
      updatedMiners[editingMinerIndex] = { ...minerFormValues };
    } else {
      updatedMiners.push({ ...minerFormValues });
    }

    try {
      await axiosInstance.put('/api/auth/profile', {
        miners: updatedMiners,
      });
      setMiners(updatedMiners);
      setOpenMinerDialog(false);
      setEditingMinerIndex(null);
      setMinerFormValues({
        manufacturer: '',
        variant: '',
        hashrate: '',
        numberOfDevices: '',
        location: '',
        latitude: null,
        longitude: null,
      });
      setMinerLocationOptions([]);
    } catch (err) {
      console.error('Failed to update miner', err);
    }
  };

  const handleFacilitySubmit = async () => {
    const updatedFacilities = [...facilities];
    if (editingFacilityIndex !== null) {
      updatedFacilities[editingFacilityIndex] = { ...facilityFormValues };
    } else {
      updatedFacilities.push({ ...facilityFormValues });
    }

    try {
      await axiosInstance.put('/api/auth/profile', {
        facilities: updatedFacilities,
      });
      setFacilities(updatedFacilities);
      setOpenFacilityDialog(false);
      setEditingFacilityIndex(null);
      setFacilityFormValues({
        type: '',
        location: '',
        description: '',
        totalHashrate: '',
        totalEnergizedMiners: '',
        totalCapacity: '',
        latitude: null,
        longitude: null,
      });
      setFacilityLocationOptions([]);
    } catch (err) {
      console.error('Failed to update facility', err);
    }
  };  

  const handleMinerLocationChange = async (event, newValue) => {
    setMinerFormValues({ ...minerFormValues, location: newValue });
    if (newValue && newValue.length > 3) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: newValue,
            format: 'json',
            addressdetails: 1,
            limit: 5,
          },
        });
        setMinerLocationOptions(response.data);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setMinerLocationOptions([]);
    }
  };

  const handleMinerLocationSelect = (event, newValue) => {
    const selectedOption = minerLocationOptions.find(
      (option) => option.display_name === newValue
    );
    if (selectedOption) {
      setMinerFormValues({
        ...minerFormValues,
        location: selectedOption.display_name,
        latitude: parseFloat(selectedOption.lat),
        longitude: parseFloat(selectedOption.lon),
      });
            // Convert country code to two-letter ISO and save it
            const countryCode = selectedOption.address.country_code.toUpperCase();
            const iso2Code = countries.alpha3ToAlpha2(countryCode);
            minerFormValues.countryCode = iso2Code; // Save ISO2 code
      
    }
  };

  const handleFacilityLocationChange = async (event, newValue) => {
    setFacilityFormValues({ ...facilityFormValues, location: newValue });
    if (newValue && newValue.length > 3) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: newValue,
            format: 'json',
            addressdetails: 1,
            limit: 5,
          },
        });
        setFacilityLocationOptions(response.data);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setFacilityLocationOptions([]);
    }
  };

  const handleFacilityLocationSelect = (event, newValue) => {
    const selectedOption = facilityLocationOptions.find(
      (option) => option.display_name === newValue
    );
    if (selectedOption) {
      setFacilityFormValues({
        ...facilityFormValues,
        location: selectedOption.display_name,
        latitude: parseFloat(selectedOption.lat),
        longitude: parseFloat(selectedOption.lon),
      });
      // Convert country code to two-letter ISO and save it
      const countryCode = selectedOption.address.country_code.toUpperCase();
      const iso2Code = countries.alpha3ToAlpha2(countryCode);
      facilityFormValues.countryCode = iso2Code; // Save ISO2 code
    }
  };

  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Personal Information</Typography>
              <Typography>Name: {userData.name}</Typography>
              <Typography>Email: {userData.email}</Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={() => navigate('/update-profile')}
          >
            Edit Profile
          </Button>

          {/* Add Miner/Facility */}
          <Box sx={{ mt: 4 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleAddMiner}>
              Add Miner
            </Button>
            <Button variant="outlined" onClick={handleAddFacility}>
              Add Facility
            </Button>
          </Box>
        </Paper>

        {/* Miners List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Miners</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Manufacturer</TableCell>
                  <TableCell>Variant</TableCell>
                  <TableCell>Hashrate (TH/s)</TableCell>
                  <TableCell>Number of Devices</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {miners.map((miner, index) => (
                  <TableRow key={index}>
                    <TableCell>{miner.manufacturer}</TableCell>
                    <TableCell>{miner.variant}</TableCell>
                    <TableCell>{miner.hashrate}</TableCell>
                    <TableCell>{miner.numberOfDevices}</TableCell>
                    <TableCell>{miner.location}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEditMiner(index)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Facilities List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Facilities</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Total Hashrate (TH/s)</TableCell>
                  <TableCell>Total Capacity (MW)</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facilities.map((facility, index) => (
                  <TableRow key={index}>
                    <TableCell>{facility.type}</TableCell>
                    <TableCell>{facility.location}</TableCell>
                    <TableCell>{facility.description}</TableCell>
                    <TableCell>{facility.totalHashrate}</TableCell>
                    <TableCell>{facility.totalCapacity}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEditFacility(index)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Add/Edit Miner Dialog */}
        <Dialog
          open={openMinerDialog}
          onClose={() => {
            setOpenMinerDialog(false);
            setEditingMinerIndex(null);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{editingMinerIndex !== null ? 'Edit Miner' : 'Add Miner'}</DialogTitle>
          <DialogContent>
            <TextField
              select
              label="Manufacturer"
              fullWidth
              margin="normal"
              value={minerFormValues.manufacturer}
              onChange={(e) =>
                setMinerFormValues({ ...minerFormValues, manufacturer: e.target.value })
              }
            >
              <MenuItem value="Bitmain">Bitmain</MenuItem>
              <MenuItem value="MicroBT">MicroBT</MenuItem>
              <MenuItem value="Canaan">Canaan</MenuItem>
              <MenuItem value="Mini-Miner">Mini-Miner</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </TextField>
            <TextField
              label="Variant"
              fullWidth
              margin="normal"
              value={minerFormValues.variant}
              onChange={(e) =>
                setMinerFormValues({ ...minerFormValues, variant: e.target.value })
              }
            />
            <TextField
              label="Hashrate (TH/s)"
              type="number"
              fullWidth
              margin="normal"
              value={minerFormValues.hashrate}
              onChange={(e) =>
                setMinerFormValues({ ...minerFormValues, hashrate: e.target.value })
              }
            />
            <TextField
              label="Number of Devices"
              type="number"
              fullWidth
              margin="normal"
              value={minerFormValues.numberOfDevices}
              onChange={(e) =>
                setMinerFormValues({ ...minerFormValues, numberOfDevices: e.target.value })
              }
            />
            <Autocomplete
              freeSolo
              fullWidth
              options={minerLocationOptions.map((option) => option.display_name)}
              value={minerFormValues.location || ''}  // Ensure controlled value
              onInputChange={handleMinerLocationChange}
              onChange={handleMinerLocationSelect}
              renderInput={(params) => (
                <TextField {...params} label="Location" margin="normal" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenMinerDialog(false)}>Cancel</Button>
            <Button onClick={handleMinerSubmit} variant="contained">
              Save Miner
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add/Edit Facility Dialog */}
        <Dialog
          open={openFacilityDialog}
          onClose={() => {
            setOpenFacilityDialog(false);
            setEditingFacilityIndex(null);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{editingFacilityIndex !== null ? 'Edit Facility' : 'Add Facility'}</DialogTitle>
          <DialogContent>
            <TextField
              select
              label="Facility Type"
              fullWidth
              margin="normal"
              value={facilityFormValues.type}
              onChange={(e) =>
                setFacilityFormValues({ ...facilityFormValues, type: e.target.value })
              }
            >
              <MenuItem value="Building">Building</MenuItem>
              <MenuItem value="Garage">Garage</MenuItem>
              <MenuItem value="Container">Container</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </TextField>
            <Autocomplete
              freeSolo
              fullWidth
              options={facilityLocationOptions.map((option) => option.display_name)}
              value={facilityFormValues.location || ''}  // Ensure controlled value
              onInputChange={handleFacilityLocationChange}
              onChange={handleFacilityLocationSelect}
              renderInput={(params) => (
                <TextField {...params} label="Location" margin="normal" />
              )}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={facilityFormValues.description}
              onChange={(e) =>
                setFacilityFormValues({ ...facilityFormValues, description: e.target.value })
              }
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Hashing Power
            </Typography>
            <TextField
              label="Total Hashrate (TH/s)"
              type="number"
              fullWidth
              margin="normal"
              value={facilityFormValues.totalHashrate}
              onChange={(e) =>
                setFacilityFormValues({ ...facilityFormValues, totalHashrate: e.target.value })
              }
            />
            <TextField
              label="Total Energized Miners"
              type="number"
              fullWidth
              margin="normal"
              value={facilityFormValues.totalEnergizedMiners}
              onChange={(e) =>
                setFacilityFormValues({ ...facilityFormValues, totalEnergizedMiners: e.target.value })
              }
            />
            <TextField
              label="Total Capacity (MW)"
              type="number"
              fullWidth
              margin="normal"
              value={facilityFormValues.totalCapacity}
              onChange={(e) =>
                setFacilityFormValues({ ...facilityFormValues, totalCapacity: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenFacilityDialog(false)}>Cancel</Button>
            <Button onClick={handleFacilitySubmit} variant="contained">
              Save Facility
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Profile;
