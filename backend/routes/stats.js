const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CountryReverseGeocoding = require('country-reverse-geocoding');
const countries = require('i18n-iso-countries');
const countryToContinent = require('../utils/countryContinentMap');

// Create an instance of country reverse geocoding
const countryReverseGeocoding = CountryReverseGeocoding.country_reverse_geocoding();

// Load the data for the countries (ISO 3166 standard)
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Function to get continent name from country code
const getContinentName = (countryCode) => {
  console.log(`Original country code: ${countryCode}`);

  // Try to convert from 3-letter to 2-letter code if necessary
  const alpha2Code = countries.alpha3ToAlpha2(countryCode);
  console.log(`Converted to 2-letter code: ${alpha2Code}`);

  const continent = countryToContinent[alpha2Code] || 'Unknown';
  console.log(`Mapped continent: ${continent}`);
  
  return continent;
};

router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find();

    let totalHashrate = 0;
    let totalMiners = 0;
    let totalCapacity = 0;
    let totalFacilities = 0;
    let totalEnergizedMiners = 0;

    const userDistribution = {
      individualMiner: 0,
      miningCompany: 0,
      hostingProvider: 0,
    };

    const hashrateByContinentMap = {};
    const minersList = [];
    const facilitiesList = [];

    for (const user of users) {
      // User Type Distribution
      if (user.userType === 'Individual Miner') {
        userDistribution.individualMiner += 1;
      } else if (user.userType === 'Mining Company') {
        userDistribution.miningCompany += 1;
      } else if (user.userType === 'Hosting Provider') {
        userDistribution.hostingProvider += 1;
      }

      // Miners
      if (user.miners && user.miners.length > 0) {
        for (const miner of user.miners) {
          const minerTotalHashrate = miner.hashrate * miner.numberOfDevices;
          totalHashrate += minerTotalHashrate;
          totalMiners += miner.numberOfDevices;

          if (miner.latitude && miner.longitude) {
            minersList.push(miner);  // Push miner data to minersList

            const country = countryReverseGeocoding.get_country(miner.latitude, miner.longitude); 
            const countryCode = country ? country.code : null;

            if (countryCode) {
                console.log(`Country code: ${countryCode}`);
                const continentName = getContinentName(countryCode);

                if (!hashrateByContinentMap[continentName]) {
                  hashrateByContinentMap[continentName] = 0;
                }
                hashrateByContinentMap[continentName] += minerTotalHashrate;
              } else {
                console.log('Country code is null or undefined for latitude:', miner.latitude, 'longitude:', miner.longitude);
            }
          }
        }
      }

      // Facilities
      if (user.facilities && user.facilities.length > 0) {
        totalFacilities += user.facilities.length;
        for (const facility of user.facilities) {
          totalHashrate += facility.totalHashrate || 0;
          totalCapacity += facility.totalCapacity || 0;
          totalEnergizedMiners += facility.totalEnergizedMiners || 0;

          if (facility.latitude && facility.longitude) {
            facilitiesList.push(facility);  // Push facility data to facilitiesList

            const country = countryReverseGeocoding.get_country(facility.latitude, facility.longitude); 
            const countryCode = country ? country.code : null;

            if (countryCode) {
              console.log(`Facility Country Code: ${countryCode}`);
              const continentName = getContinentName(countryCode);

              if (!hashrateByContinentMap[continentName]) {
                hashrateByContinentMap[continentName] = 0;
              }
              hashrateByContinentMap[continentName] += facility.totalHashrate || 0;
            }
          }
        }
      }
    }

    const hashrateByContinent = Object.keys(hashrateByContinentMap).map((continentName) => ({
      continent: continentName,
      hashrate: hashrateByContinentMap[continentName],
    }));

    res.json({
      totalHashrate,
      totalMiners,
      totalCapacity,
      totalFacilities,
      totalEnergizedMiners,
      userDistribution,
      hashrateByContinent,
      miners: minersList,  // Return miners list
      facilities: facilitiesList,  // Return facilities list
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
