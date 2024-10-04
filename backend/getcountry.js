const fs = require('fs');
const countryData = require('country-data');

// Manually define continent mappings
const continentMapping = {
  'AF': 'Africa',
  'AN': 'Antarctica',
  'AS': 'Asia',
  'EU': 'Europe',
  'NA': 'North America',
  'OC': 'Oceania',
  'SA': 'South America'
};

// Define countries that belong to each continent
const countryToContinent = {};
countryData.countries.all.forEach((country) => {
  // Use the numeric codes to map to continents, if available
  switch (country.continent) {
    case 'AF':
      countryToContinent[country.alpha2] = 'Africa';
      countryToContinent[country.alpha3] = 'Africa';
      break;
    case 'AN':
      countryToContinent[country.alpha2] = 'Antarctica';
      countryToContinent[country.alpha3] = 'Antarctica';
      break;
    case 'AS':
      countryToContinent[country.alpha2] = 'Asia';
      countryToContinent[country.alpha3] = 'Asia';
      break;
    case 'EU':
      countryToContinent[country.alpha2] = 'Europe';
      countryToContinent[country.alpha3] = 'Europe';
      break;
    case 'NA':
      countryToContinent[country.alpha2] = 'North America';
      countryToContinent[country.alpha3] = 'North America';
      break;
    case 'OC':
      countryToContinent[country.alpha2] = 'Oceania';
      countryToContinent[country.alpha3] = 'Oceania';
      break;
    case 'SA':
      countryToContinent[country.alpha2] = 'South America';
      countryToContinent[country.alpha3] = 'South America';
      break;
    default:
      console.log(`Missing region for country: ${country.name}`);
      break;
  }
});

// Save the mapping to a file
fs.writeFileSync(
  './countryContinentMap.js',
  `module.exports = ${JSON.stringify(countryToContinent, null, 2)};`
);

console.log('Country-to-continent map generated successfully.');
