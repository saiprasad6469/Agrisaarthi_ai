export const DEMO_SOIL_LABS = [
  {
    id: 'lab-1',
    name: 'District Soil Testing Laboratory - Nizamabad',
    authorizationStatus: 'Government Approved Lab',
    address: 'Near Collectorate Office, Subhash Nagar, Nizamabad',
    district: 'Nizamabad',
    latitude: 18.6725,
    longitude: 78.0941,
    distance: '3.5 km',
    contact: '+91 94401 23456',
    openingHours: '9:00 AM - 5:00 PM (Mon-Sat)'
  },
  {
    id: 'lab-2',
    name: 'KVK Soil & Water Testing Center',
    authorizationStatus: 'Agricultural University Extension Center',
    address: 'Rudrur Krishi Vigyan Kendra, Nizamabad Road',
    district: 'Nizamabad',
    latitude: 18.5833,
    longitude: 77.8833,
    distance: '12.0 km',
    contact: '+91 98480 98765',
    openingHours: '9:30 AM - 4:30 PM (Mon-Fri)'
  },
  {
    id: 'lab-3',
    name: 'AgriScience Bio-Labs & Soil Diagnostics',
    authorizationStatus: 'ICAR Accredited Private Lab',
    address: 'Main Road, Armoor, Nizamabad District',
    district: 'Nizamabad',
    latitude: 18.7889,
    longitude: 78.2861,
    distance: '18.2 km',
    contact: '+91 91234 56789',
    openingHours: '8:30 AM - 6:00 PM (Mon-Sat)'
  },
  {
    id: 'lab-4',
    name: 'Bodhan Farmers Soil Health Lab',
    authorizationStatus: 'State Agriculture Department Partner',
    address: 'APMC Market Yard Complex, Bodhan',
    district: 'Nizamabad',
    latitude: 18.6653,
    longitude: 77.8964,
    distance: '24.5 km',
    contact: '+91 90001 11223',
    openingHours: '9:00 AM - 5:30 PM (Mon-Sat)'
  }
];

export const DEMO_CROPS = [
  {
    id: 'crop-1',
    name: 'Tomato',
    category: 'Vegetable',
    pHRange: { min: 6.0, max: 7.2 },
    waterRequirement: 'Moderate (400-600 mm)',
    duration: '90 - 100 days',
    durationDays: 90,
    sowingPeriod: 'Kharif / Rabi (June-July & Oct-Nov)',
    harvestPeriod: '75-90 days after planting',
    expectedYield: '12 - 15 Tons / Acre',
    cultivationCost: 32000,
    estimatedRevenue: 95000,
    marketDemand: 'High',
    risks: ['Bacterial Wilt', 'Fruit Borer', 'Price Fluctuation'],
    description: 'Tomato is a high-demand cash crop suited for well-drained loamy soils rich in organic matter. Responds very well to balanced NPK and drip irrigation.'
  },
  {
    id: 'crop-2',
    name: 'Chilli',
    category: 'Spices & Vegetables',
    pHRange: { min: 6.2, max: 7.5 },
    waterRequirement: 'Moderate (500-700 mm)',
    duration: '140 - 160 days',
    durationDays: 150,
    sowingPeriod: 'Kharif (July-August)',
    harvestPeriod: 'Multiple pickings (Nov-Feb)',
    expectedYield: '8 - 10 Tons (Green) / 1.8 Tons (Dry) per Acre',
    cultivationCost: 45000,
    estimatedRevenue: 135000,
    marketDemand: 'High',
    risks: ['Thrips', 'Leaf Curl Virus', 'Dieback'],
    description: 'Chilli is a profitable commercial crop with steady market demand in Telangana and Andhra Pradesh. Requires good soil aeration and potassium enrichment.'
  },
  {
    id: 'crop-3',
    name: 'Maize (Corn)',
    category: 'Cereal',
    pHRange: { min: 5.8, max: 7.8 },
    waterRequirement: 'Low to Moderate (450-550 mm)',
    duration: '100 - 110 days',
    durationDays: 105,
    sowingPeriod: 'Kharif (June-July) / Rabi (Oct-Nov)',
    harvestPeriod: '100 days after sowing',
    expectedYield: '28 - 32 Quintals / Acre',
    cultivationCost: 22000,
    estimatedRevenue: 62000,
    marketDemand: 'High',
    risks: ['Fall Armyworm', 'Stem Borer', 'Unseasonal Rain'],
    description: 'Maize is a sturdy cereal crop with low labor requirements and guaranteed market demand from poultry and starch industries.'
  },
  {
    id: 'crop-4',
    name: 'Cotton',
    category: 'Commercial Fiber',
    pHRange: { min: 6.0, max: 8.0 },
    waterRequirement: 'Moderate to High (700-1000 mm)',
    duration: '150 - 180 days',
    durationDays: 165,
    sowingPeriod: 'Kharif (June-July)',
    harvestPeriod: 'Oct-Jan (Multiple pickings)',
    expectedYield: '10 - 14 Quintals / Acre',
    cultivationCost: 38000,
    estimatedRevenue: 92000,
    marketDemand: 'Moderate to High',
    risks: ['Pink Bollworm', 'Sucking Pests', 'Monsoon Failure'],
    description: 'Cotton thrives in deep black and loamy soils with adequate sulfur and zinc reserves.'
  },
  {
    id: 'crop-5',
    name: 'Paddy (Rice)',
    category: 'Cereal',
    pHRange: { min: 5.5, max: 7.0 },
    waterRequirement: 'High (1200-1400 mm)',
    duration: '120 - 135 days',
    durationDays: 130,
    sowingPeriod: 'Kharif (June-July) / Rabi (Nov-Dec)',
    harvestPeriod: 'Oct-Nov / April-May',
    expectedYield: '25 - 30 Quintals / Acre',
    cultivationCost: 30000,
    estimatedRevenue: 75000,
    marketDemand: 'Very High',
    risks: ['Blast Disease', 'Stem Borer', 'Water Scarcity in Rabi'],
    description: 'Paddy is a staple cereal requiring clay or clay-loam soils with high water retention capacity.'
  }
];

export const DEMO_MARKETS = [
  {
    id: 'market-1',
    name: 'Nizamabad APMC Market Yard',
    district: 'Nizamabad',
    crop: 'Tomato',
    currentPrice: '₹18 - 22 / kg',
    pricePerKg: 20,
    trend: 'Up 12%',
    trendDirection: 'up',
    distance: '5 km',
    demand: 'High',
    lastUpdated: '2 hrs ago',
    priceHistory: [
      { date: 'Apr 20', price: 15 },
      { date: 'Apr 21', price: 16 },
      { date: 'Apr 22', price: 18 },
      { date: 'Apr 23', price: 17 },
      { date: 'Apr 24', price: 19 },
      { date: 'Apr 25', price: 20 },
      { date: 'Apr 26', price: 22 }
    ]
  },
  {
    id: 'market-2',
    name: 'Kamareddy Agriculture Market',
    district: 'Kamareddy',
    crop: 'Tomato',
    currentPrice: '₹16 - 20 / kg',
    pricePerKg: 18,
    trend: 'Up 8%',
    trendDirection: 'up',
    distance: '32 km',
    demand: 'Medium',
    lastUpdated: '3 hrs ago',
    priceHistory: [
      { date: 'Apr 20', price: 14 },
      { date: 'Apr 21', price: 15 },
      { date: 'Apr 22', price: 16 },
      { date: 'Apr 23', price: 16 },
      { date: 'Apr 24', price: 17 },
      { date: 'Apr 25', price: 18 },
      { date: 'Apr 26', price: 18 }
    ]
  },
  {
    id: 'market-3',
    name: 'Bodhan Grain & Vegetable Market',
    district: 'Nizamabad',
    crop: 'Tomato',
    currentPrice: '₹15 - 18 / kg',
    pricePerKg: 16.5,
    trend: 'Down 5%',
    trendDirection: 'down',
    distance: '45 km',
    demand: 'Medium',
    lastUpdated: '4 hrs ago',
    priceHistory: [
      { date: 'Apr 20', price: 18 },
      { date: 'Apr 21', price: 18 },
      { date: 'Apr 22', price: 17 },
      { date: 'Apr 23', price: 17 },
      { date: 'Apr 24', price: 16 },
      { date: 'Apr 25', price: 16 },
      { date: 'Apr 26', price: 16.5 }
    ]
  },
  {
    id: 'market-4',
    name: 'Hyderabad Bowenpally Wholesale Market',
    district: 'Hyderabad',
    crop: 'Tomato',
    currentPrice: '₹20 - 26 / kg',
    pricePerKg: 24,
    trend: 'Up 18%',
    trendDirection: 'up',
    distance: '160 km',
    demand: 'High',
    lastUpdated: '1 hr ago',
    priceHistory: [
      { date: 'Apr 20', price: 19 },
      { date: 'Apr 21', price: 20 },
      { date: 'Apr 22', price: 21 },
      { date: 'Apr 23', price: 22 },
      { date: 'Apr 24', price: 23 },
      { date: 'Apr 25', price: 24 },
      { date: 'Apr 26', price: 25 }
    ]
  }
];

export const DEMO_BUYERS = [
  {
    id: 'buyer-1',
    name: 'FreshFarm Traders',
    buyerType: 'Wholesale Vegetables & Produce',
    crop: 'Tomato',
    cropsRequired: ['Tomato', 'Chilli', 'Brinjal'],
    quantityRequired: '50 Tons',
    location: 'Nizamabad Market Yard',
    district: 'Nizamabad',
    distance: '5 km',
    contact: '+91 98765 43210'
  },
  {
    id: 'buyer-2',
    name: 'Green Harvest Co.',
    buyerType: 'Food Processing & Retail Chain',
    crop: 'Tomato',
    cropsRequired: ['Tomato', 'Onion', 'Potato'],
    quantityRequired: '30 Tons',
    location: 'Homestead District Hub',
    district: 'Kamareddy',
    distance: '25 km',
    contact: '+91 91544 32109'
  },
  {
    id: 'buyer-3',
    name: 'Agri Market Solutions',
    buyerType: 'Institutional Procurement Agent',
    crop: 'Tomato',
    cropsRequired: ['Tomato', 'Maize', 'Paddy'],
    quantityRequired: '100 Tons',
    location: 'Secunderabad Mandi',
    district: 'Hyderabad',
    distance: '155 km',
    contact: '+91 74543 21098'
  }
];

export const DEFAULT_SOIL_DATA = {
  pH: 6.8,
  nitrogen: 45, // low
  phosphorus: 18, // moderate
  potassium: 120, // good
  organicCarbon: 1.2, // good
  sulfur: 8, // moderate
  zinc: 0.6, // low
  iron: 3.2 // good
};
