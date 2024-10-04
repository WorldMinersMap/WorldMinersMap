import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Import the axios instance
import { useParams } from 'react-router-dom';

function MinerDetails() {
  const { id } = useParams();
  const [miner, setMiner] = useState(null);

  useEffect(() => {
    const fetchMiner = async () => {
      try {
        const res = await axiosInstance.get(`/api/miners/${id}`);
        setMiner(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMiner();
  }, [id]);

  if (!miner) return <div>Loading...</div>;

  return (
    <div>
      <h2>{miner.machineType}</h2>
      <p>Hash Rate: {miner.hashRate}</p>
      <p>Owner: {miner.user.name}</p>
      <p>Hosting Provider: {miner.user.isHostingProvider ? 'Yes' : 'No'}</p>
      <p>Location: [{miner.location.coordinates[1]}, {miner.location.coordinates[0]}]</p>
    </div>
  );
}

export default MinerDetails;
