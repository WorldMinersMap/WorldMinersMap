import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster'; // Import marker cluster plugin
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // Import marker cluster styles
import 'leaflet.markercluster/dist/MarkerCluster.css'; // Additional styles

// Fix for default marker icon issues in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
// Custom icons for miners and facilities
const minerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Blue default icon for miners
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  
  const facilityIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Red marker for facilities
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  
// Map from continent codes to full names
const continentFullNames = {
  'EU': 'Europe',
  'AS': 'Asia',
  'AF': 'Africa',
  'NA': 'North America',
  'SA': 'South America',
  'OC': 'Oceania',
  'AN': 'Antarctica',
};

// Helper function to format hashrate based on the highest unit
const formatHashrate = (hashrateInTH, highestUnit) => {
  if (highestUnit === 'EH') {
    return (hashrateInTH / 1e6).toFixed(2); // Exahash
  } else if (highestUnit === 'PH') {
    return (hashrateInTH / 1e3).toFixed(2); // Petahash
  }
  return hashrateInTH.toFixed(2); // Terahash
};

// Helper function to get the highest unit
const getHighestUnit = (maxHashrateInTH) => {
  if (maxHashrateInTH >= 1e6) {
    return 'EH'; // Exahash
  } else if (maxHashrateInTH >= 1e3) {
    return 'PH'; // Petahash
  }
  return 'TH'; // Terahash
};

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [highestUnit, setHighestUnit] = useState('TH'); // Default to Terahash

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/api/stats/dashboard');
        setStats(res.data);

        // Determine the highest unit based on the maximum hashrate across all continents
        const maxHashrateInTH = Math.max(...res.data.hashrateByContinent.map(item => item.hashrate));
        const unit = getHighestUnit(maxHashrateInTH);
        setHighestUnit(unit); // Set the highest unit

        // Prepare map markers from miners and facilities
        const markers = [];

        if (res.data.miners && res.data.miners.length > 0) {
          res.data.miners.forEach((miner) => {
            if (miner.latitude && miner.longitude) {
              markers.push({
                type: 'Miner',
                name: `${miner.manufacturer} ${miner.variant}`,
                location: miner.location,
                latitude: miner.latitude,
                longitude: miner.longitude,
                icon: minerIcon, // Assign miner icon
              });
            }
          });
        }

        if (res.data.facilities && res.data.facilities.length > 0) {
          res.data.facilities.forEach((facility) => {
            if (facility.latitude && facility.longitude) {
              markers.push({
                type: 'Facility',
                name: facility.type,
                location: facility.location,
                description: facility.description,
                latitude: facility.latitude,
                longitude: facility.longitude,
                icon: facilityIcon, // Assign facility icon
              });
            }
          });
        }

        setMapMarkers(markers);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    };
    fetchStats();
  }, []);

  // Custom MarkerCluster component to handle clustering logic
  const MarkerCluster = () => {
    const map = useMap();

    useEffect(() => {
      const markersClusterGroup = L.markerClusterGroup();

      mapMarkers.forEach((marker) => {
        const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon: marker.icon }) // Use the custom icon
          .bindPopup(`
            <div>
              <strong>${marker.type}: ${marker.name}</strong><br/>
              <span>Location: ${marker.location}</span><br/>
              ${marker.description ? `<span>Description: ${marker.description}</span>` : ''}
            </div>
          `);
        markersClusterGroup.addLayer(leafletMarker);
      });

      map.addLayer(markersClusterGroup);

      return () => {
        map.removeLayer(markersClusterGroup);
      };
    }, [map, mapMarkers]);

    return null;
  };

  if (!stats) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  // Convert total hashrate to the highest unit
  const formattedTotalHashrate = formatHashrate(stats.totalHashrate, highestUnit);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Total Hashrate ({highestUnit}/s)</Typography>
              <Typography variant="h5">{formattedTotalHashrate}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Total Miners</Typography>
              <Typography variant="h5">{stats.totalMiners}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Total Capacity (MW)</Typography>
              <Typography variant="h5">{stats.totalCapacity}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Total Facilities</Typography>
              <Typography variant="h5">{stats.totalFacilities}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* User Distribution Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Pie
                data={{
                  labels: ['Individual Miner', 'Mining Company', 'Hosting Provider'],
                  datasets: [
                    {
                      data: [
                        stats.userDistribution.individualMiner,
                        stats.userDistribution.miningCompany,
                        stats.userDistribution.hostingProvider,
                      ],
                      backgroundColor: ['#3f51b5', '#e91e63', '#ff9800'],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </Paper>
          </Grid>

          {/* Hashrate by Continent Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Hashrate by Continent ({highestUnit}/s)
              </Typography>
              <Bar
                data={{
                  labels: stats.hashrateByContinent.map((item) => continentFullNames[item.continent] || item.continent),
                  datasets: [
                    {
                      label: `Hashrate (${highestUnit}/s)`,
                      data: stats.hashrateByContinent.map((item) => formatHashrate(item.hashrate, highestUnit)),
                      backgroundColor: '#3f51b5',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Map with Marker Clusters */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Global Mining Map
          </Typography>
          <Paper sx={{ height: '600px' }}>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={1}
            maxZoom={18}
            style={{ height: '100%', width: '100%' }}
            >
            <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {/* Marker Clusters */}
            <MarkerCluster />
            </MapContainer>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
