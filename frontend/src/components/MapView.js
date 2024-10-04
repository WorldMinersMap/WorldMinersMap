// frontend/src/components/MapView.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, Tooltip } from 'react-leaflet';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons
const minerIcon = new L.Icon({
  iconUrl: require('../assets/miner-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const facilityIcon = new L.Icon({
  iconUrl: require('../assets/facility-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapView() {
  const [operationType, setOperationType] = useState('All');
  const [locations, setLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get('/api/map/locations', {
          params: { operationType },
        });
        setLocations(res.data);
      } catch (err) {
        console.error('Failed to load locations', err);
      }
    };
    fetchLocations();
  }, [operationType]);

  const handleMarkerClick = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  // Map bounds to limit zooming out
  const bounds = [
    [-85, -180],
    [85, 180],
  ];

  return (
    <div>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="operation-type-label">Filter by Operation Type</InputLabel>
        <Select
          labelId="operation-type-label"
          value={operationType}
          label="Filter by Operation Type"
          onChange={(e) => setOperationType(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Individual Miner">Individual Miner</MenuItem>
          <MenuItem value="Mining Company">Company</MenuItem>
          <MenuItem value="Hosting Provider">Hosting Provider</MenuItem>
        </Select>
      </FormControl>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={10}
        maxBounds={bounds}
        zoomControl={false}
        style={{ height: '500px', marginTop: '20px' }}
      >
        <ZoomControl position="bottomright" />
        {/* Tile layer with country labels */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {locations.map((item, index) => (
          <Marker
            key={index}
            position={[item.latitude, item.longitude]}
            icon={item.type === 'miner' ? minerIcon : facilityIcon}
            eventHandlers={{
              click: () => handleMarkerClick(item),
            }}
          >
            <Tooltip>{item.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Dialog to show miner/facility details */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedItem?.name}</DialogTitle>
        <DialogContent>
          {/* Display details about the miner/facility */}
          <Typography variant="body1">
            Operation Type: {selectedItem?.operationType}
          </Typography>
          <Typography variant="body1">
            Location: {selectedItem?.location}
          </Typography>
          {/* Display more details depending on the item type */}
          {selectedItem?.type === 'miner' && (
            <>
              <Typography variant="body1">
                Manufacturer: {selectedItem?.manufacturer}
              </Typography>
              <Typography variant="body1">
                Variant: {selectedItem?.variant}
              </Typography>
              <Typography variant="body1">
                Hashrate: {selectedItem?.hashrate} TH/s
              </Typography>
              <Typography variant="body1">
                Number of Devices: {selectedItem?.numberOfDevices}
              </Typography>
            </>
          )}
          {selectedItem?.type === 'facility' && (
            <>
              <Typography variant="body1">
                Facility Type: {selectedItem?.facilityType}
              </Typography>
              <Typography variant="body1">
                Total Hashrate: {selectedItem?.totalHashrate} TH/s
              </Typography>
              <Typography variant="body1">
                Total Energized Miners: {selectedItem?.totalEnergizedMiners}
              </Typography>
              <Typography variant="body1">
                Total Capacity: {selectedItem?.totalCapacity} MW
              </Typography>
              <Typography variant="body1">
                Description: {selectedItem?.description}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MapView;
