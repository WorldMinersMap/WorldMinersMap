// Country to Continent Mapping (Expanded)
const countryToContinent = {
    'AF': 'AS', 'AFG': 'AS',  // Afghanistan
    'AL': 'EU', 'ALB': 'EU',  // Albania
    'DZ': 'AF', 'DZA': 'AF',  // Algeria
    'AS': 'OC', 'ASM': 'OC',  // American Samoa
    'AD': 'EU', 'AND': 'EU',  // Andorra
    'AO': 'AF', 'AGO': 'AF',  // Angola
    'AI': 'NA', 'AIA': 'NA',  // Anguilla
    'AQ': 'AN', 'ATA': 'AN',  // Antarctica
    'AG': 'NA', 'ATG': 'NA',  // Antigua and Barbuda
    'AR': 'SA', 'ARG': 'SA',  // Argentina
    'AM': 'AS', 'ARM': 'AS',  // Armenia
    'AW': 'NA', 'ABW': 'NA',  // Aruba
    'AU': 'OC', 'AUS': 'OC',  // Australia
    'AT': 'EU', 'AUT': 'EU',  // Austria
    'AZ': 'AS', 'AZE': 'AS',  // Azerbaijan
    'BS': 'NA', 'BHS': 'NA',  // Bahamas
    'BH': 'AS', 'BHR': 'AS',  // Bahrain
    'BD': 'AS', 'BGD': 'AS',  // Bangladesh
    'BB': 'NA', 'BRB': 'NA',  // Barbados
    'BY': 'EU', 'BLR': 'EU',  // Belarus
    'BE': 'EU', 'BEL': 'EU',  // Belgium
    'BZ': 'NA', 'BLZ': 'NA',  // Belize
    'BJ': 'AF', 'BEN': 'AF',  // Benin
    'BM': 'NA', 'BMU': 'NA',  // Bermuda
    'BT': 'AS', 'BTN': 'AS',  // Bhutan
    'BO': 'SA', 'BOL': 'SA',  // Bolivia
    'BA': 'EU', 'BIH': 'EU',  // Bosnia and Herzegovina
    'BW': 'AF', 'BWA': 'AF',  // Botswana
    'BR': 'SA', 'BRA': 'SA',  // Brazil
    'BN': 'AS', 'BRN': 'AS',  // Brunei
    'BG': 'EU', 'BGR': 'EU',  // Bulgaria
    'BF': 'AF', 'BFA': 'AF',  // Burkina Faso
    'BI': 'AF', 'BDI': 'AF',  // Burundi
    'CV': 'AF', 'CPV': 'AF',  // Cabo Verde
    'KH': 'AS', 'KHM': 'AS',  // Cambodia
    'CM': 'AF', 'CMR': 'AF',  // Cameroon
    'CA': 'NA', 'CAN': 'NA',  // Canada
    'KY': 'NA', 'CYM': 'NA',  // Cayman Islands
    'CF': 'AF', 'CAF': 'AF',  // Central African Republic
    'TD': 'AF', 'TCD': 'AF',  // Chad
    'CL': 'SA', 'CHL': 'SA',  // Chile
    'CN': 'AS', 'CHN': 'AS',  // China
    'CO': 'SA', 'COL': 'SA',  // Colombia
    'KM': 'AF', 'COM': 'AF',  // Comoros
    'CG': 'AF', 'COG': 'AF',  // Congo
    'CD': 'AF', 'COD': 'AF',  // Democratic Republic of Congo
    'CR': 'NA', 'CRI': 'NA',  // Costa Rica
    'HR': 'EU', 'HRV': 'EU',  // Croatia
    'CU': 'NA', 'CUB': 'NA',  // Cuba
    'CY': 'AS', 'CYP': 'AS',  // Cyprus
    'CZ': 'EU', 'CZE': 'EU',  // Czech Republic
    'DK': 'EU', 'DNK': 'EU',  // Denmark
    'DJ': 'AF', 'DJI': 'AF',  // Djibouti
    'DM': 'NA', 'DMA': 'NA',  // Dominica
    'DO': 'NA', 'DOM': 'NA',  // Dominican Republic
    'EC': 'SA', 'ECU': 'SA',  // Ecuador
    'EG': 'AF', 'EGY': 'AF',  // Egypt
    'SV': 'NA', 'SLV': 'NA',  // El Salvador
    'GQ': 'AF', 'GNQ': 'AF',  // Equatorial Guinea
    'ER': 'AF', 'ERI': 'AF',  // Eritrea
    'EE': 'EU', 'EST': 'EU',  // Estonia
    'ET': 'AF', 'ETH': 'AF',  // Ethiopia
    'FJ': 'OC', 'FJI': 'OC',  // Fiji
    'FI': 'EU', 'FIN': 'EU',  // Finland
    'FR': 'EU', 'FRA': 'EU',  // France
    'GA': 'AF', 'GAB': 'AF',  // Gabon
    'GM': 'AF', 'GMB': 'AF',  // Gambia
    'GE': 'AS', 'GEO': 'AS',  // Georgia
    'DE': 'EU', 'DEU': 'EU',  // Germany
    'GH': 'AF', 'GHA': 'AF',  // Ghana
    'GR': 'EU', 'GRC': 'EU',  // Greece
    'GL': 'NA', 'GRL': 'NA',  // Greenland
    'GD': 'NA', 'GRD': 'NA',  // Grenada
    'GU': 'OC', 'GUM': 'OC',  // Guam
    'GT': 'NA', 'GTM': 'NA',  // Guatemala
    'GN': 'AF', 'GIN': 'AF',  // Guinea
    'GW': 'AF', 'GNB': 'AF',  // Guinea-Bissau
    'GY': 'SA', 'GUY': 'SA',  // Guyana
    'HT': 'NA', 'HTI': 'NA',  // Haiti
    'HN': 'NA', 'HND': 'NA',  // Honduras
    'HK': 'AS', 'HKG': 'AS',  // Hong Kong
    'HU': 'EU', 'HUN': 'EU',  // Hungary
    'IS': 'EU', 'ISL': 'EU',  // Iceland
    'IN': 'AS', 'IND': 'AS',  // India
    'ID': 'AS', 'IDN': 'AS',  // Indonesia
    'IR': 'AS', 'IRN': 'AS',  // Iran
    'IQ': 'AS', 'IRQ': 'AS',  // Iraq
    'IE': 'EU', 'IRL': 'EU',  // Ireland
    'IL': 'AS', 'ISR': 'AS',  // Israel
    'IT': 'EU', 'ITA': 'EU',  // Italy
    'JM': 'NA', 'JAM': 'NA',  // Jamaica
    'JP': 'AS', 'JPN': 'AS',  // Japan
    'JO': 'AS', 'JOR': 'AS',  // Jordan
    'KZ': 'AS', 'KAZ': 'AS',  // Kazakhstan
    'KE': 'AF', 'KEN': 'AF',  // Kenya
    'KI': 'OC', 'KIR': 'OC',  // Kiribati
    'KP': 'AS', 'PRK': 'AS',  // North Korea
    'KR': 'AS', 'KOR': 'AS',  // South Korea
    'KW': 'AS', 'KWT': 'AS',  // Kuwait
    'KG': 'AS', 'KGZ': 'AS',  // Kyrgyzstan
    'LA': 'AS', 'LAO': 'AS',  // Laos
    'LV': 'EU', 'LVA': 'EU',  // Latvia
    'LB': 'AS', 'LBN': 'AS',  // Lebanon
    'LS': 'AF', 'LSO': 'AF',  // Lesotho
    'LR': 'AF', 'LBR': 'AF',  // Liberia
    'LY': 'AF', 'LBY': 'AF',  // Libya
    'LI': 'EU', 'LIE': 'EU',  // Liechtenstein
    'LT': 'EU', 'LTU': 'EU',  // Lithuania
    'LU': 'EU', 'LUX': 'EU',  // Luxembourg
    'MO': 'AS', 'MAC': 'AS',  // Macau
    'MG': 'AF', 'MDG': 'AF',  // Madagascar
    'MW': 'AF', 'MWI': 'AF',  // Malawi
    'MY': 'AS', 'MYS': 'AS',  // Malaysia
    'MV': 'AS', 'MDV': 'AS',  // Maldives
    'ML': 'AF', 'MLI': 'AF',  // Mali
    'MT': 'EU', 'MLT': 'EU',  // Malta
    'MH': 'OC', 'MHL': 'OC',  // Marshall Islands
    'MQ': 'NA', 'MTQ': 'NA',  // Martinique
    'MR': 'AF', 'MRT': 'AF',  // Mauritania
    'MU': 'AF', 'MUS': 'AF',  // Mauritius
    'YT': 'AF', 'MYT': 'AF',  // Mayotte
    'MX': 'NA', 'MEX': 'NA',  // Mexico
    'FM': 'OC', 'FSM': 'OC',  // Micronesia
    'MD': 'EU', 'MDA': 'EU',  // Moldova
    'MC': 'EU', 'MCO': 'EU',  // Monaco
    'MN': 'AS', 'MNG': 'AS',  // Mongolia
    'ME': 'EU', 'MNE': 'EU',  // Montenegro
    'MS': 'NA', 'MSR': 'NA',  // Montserrat
    'MA': 'AF', 'MAR': 'AF',  // Morocco
    'MZ': 'AF', 'MOZ': 'AF',  // Mozambique
    'MM': 'AS', 'MMR': 'AS',  // Myanmar
    'NA': 'AF', 'NAM': 'AF',  // Namibia
    'NR': 'OC', 'NRU': 'OC',  // Nauru
    'NP': 'AS', 'NPL': 'AS',  // Nepal
    'NL': 'EU', 'NLD': 'EU',  // Netherlands
    'NC': 'OC', 'NCL': 'OC',  // New Caledonia
    'NZ': 'OC', 'NZL': 'OC',  // New Zealand
    'NI': 'NA', 'NIC': 'NA',  // Nicaragua
    'NE': 'AF', 'NER': 'AF',  // Niger
    'NG': 'AF', 'NGA': 'AF',  // Nigeria
    'NU': 'OC', 'NIU': 'OC',  // Niue
    'NF': 'OC', 'NFK': 'OC',  // Norfolk Island
    'MP': 'OC', 'MNP': 'OC',  // Northern Mariana Islands
    'NO': 'EU', 'NOR': 'EU',  // Norway
    'OM': 'AS', 'OMN': 'AS',  // Oman
    'PK': 'AS', 'PAK': 'AS',  // Pakistan
    'PW': 'OC', 'PLW': 'OC',  // Palau
    'PA': 'NA', 'PAN': 'NA',  // Panama
    'PG': 'OC', 'PNG': 'OC',  // Papua New Guinea
    'PY': 'SA', 'PRY': 'SA',  // Paraguay
    'PE': 'SA', 'PER': 'SA',  // Peru
    'PH': 'AS', 'PHL': 'AS',  // Philippines
    'PL': 'EU', 'POL': 'EU',  // Poland
    'PT': 'EU', 'PRT': 'EU',  // Portugal
    'PR': 'NA', 'PRI': 'NA',  // Puerto Rico
    'QA': 'AS', 'QAT': 'AS',  // Qatar
    'RO': 'EU', 'ROU': 'EU',  // Romania
    'RU': 'EU', 'RUS': 'EU',  // Russia
    'RW': 'AF', 'RWA': 'AF',  // Rwanda
    'WS': 'OC', 'WSM': 'OC',  // Samoa
    'SM': 'EU', 'SMR': 'EU',  // San Marino
    'ST': 'AF', 'STP': 'AF',  // Sao Tome and Principe
    'SA': 'AS', 'SAU': 'AS',  // Saudi Arabia
    'SN': 'AF', 'SEN': 'AF',  // Senegal
    'RS': 'EU', 'SRB': 'EU',  // Serbia
    'SC': 'AF', 'SYC': 'AF',  // Seychelles
    'SL': 'AF', 'SLE': 'AF',  // Sierra Leone
    'SG': 'AS', 'SGP': 'AS',  // Singapore
    'SK': 'EU', 'SVK': 'EU',  // Slovakia
    'SI': 'EU', 'SVN': 'EU',  // Slovenia
    'SB': 'OC', 'SLB': 'OC',  // Solomon Islands
    'SO': 'AF', 'SOM': 'AF',  // Somalia
    'ZA': 'AF', 'ZAF': 'AF',  // South Africa
    'SS': 'AF', 'SSD': 'AF',  // South Sudan
    'ES': 'EU', 'ESP': 'EU',  // Spain
    'LK': 'AS', 'LKA': 'AS',  // Sri Lanka
    'SD': 'AF', 'SDN': 'AF',  // Sudan
    'SR': 'SA', 'SUR': 'SA',  // Suriname
    'SE': 'EU', 'SWE': 'EU',  // Sweden
    'CH': 'EU', 'CHE': 'EU',  // Switzerland
    'SY': 'AS', 'SYR': 'AS',  // Syria
    'TW': 'AS', 'TWN': 'AS',  // Taiwan
    'TJ': 'AS', 'TJK': 'AS',  // Tajikistan
    'TZ': 'AF', 'TZA': 'AF',  // Tanzania
    'TH': 'AS', 'THA': 'AS',  // Thailand
    'TL': 'AS', 'TLS': 'AS',  // Timor-Leste
    'TG': 'AF', 'TGO': 'AF',  // Togo
    'TK': 'OC', 'TKL': 'OC',  // Tokelau
    'TO': 'OC', 'TON': 'OC',  // Tonga
    'TT': 'NA', 'TTO': 'NA',  // Trinidad and Tobago
    'TN': 'AF', 'TUN': 'AF',  // Tunisia
    'TR': 'AS', 'TUR': 'AS',  // Turkey
    'TM': 'AS', 'TKM': 'AS',  // Turkmenistan
    'TC': 'NA', 'TCA': 'NA',  // Turks and Caicos Islands
    'TV': 'OC', 'TUV': 'OC',  // Tuvalu
    'UG': 'AF', 'UGA': 'AF',  // Uganda
    'UA': 'EU', 'UKR': 'EU',  // Ukraine
    'AE': 'AS', 'ARE': 'AS',  // United Arab Emirates
    'GB': 'EU', 'GBR': 'EU',  // United Kingdom
    'US': 'NA', 'USA': 'NA',  // United States
    'UY': 'SA', 'URY': 'SA',  // Uruguay
    'UZ': 'AS', 'UZB': 'AS',  // Uzbekistan
    'VU': 'OC', 'VUT': 'OC',  // Vanuatu
    'VE': 'SA', 'VEN': 'SA',  // Venezuela
    'VN': 'AS', 'VNM': 'AS',  // Vietnam
    'EH': 'AF', 'ESH': 'AF',  // Western Sahara
    'YE': 'AS', 'YEM': 'AS',  // Yemen
    'ZM': 'AF', 'ZMB': 'AF',  // Zambia
    'ZW': 'AF', 'ZWE': 'AF'   // Zimbabwe
  };
  
  module.exports = countryToContinent;
  