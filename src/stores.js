import { writable, derived } from 'svelte/store';

// User inputs
export const milesPerWeek = writable(100);
export const carType = writable('gasoline');
export const flightsPerYear = writable(2);
export const publicTransitMiles = writable(0);

export const homeSize = writable('medium');
export const homeEnergy = writable('mixed');
export const heatingType = writable('gas');
export const peopleInHome = writable(2);
export const waterHeater = writable('gas');

export const beefMealsPerWeek = writable(3);
export const otherMeatMeals = writable(4);
export const dairyServingsPerDay = writable(2);
export const shoppingHabit = writable('average');
export const foodWaste = writable('average');

/*
 * EMISSION FACTORS WITH SOURCES:
 * 
 * VEHICLES:
 * - EPA: Average car emits 400 grams CO2/mile = 0.000400 metric tons/mile
 * - Source: https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle
 * - EPA Equivalencies Calculator: 3.93 x 10^-4 metric tons CO2e/mile
 * 
 * FLIGHTS:
 * - ICCT/Sustainable Travel: Domestic round-trip ~0.4-1.1 tons depending on distance
 * - LA to NYC round-trip: 1.1 metric tons (Sustainable Travel International)
 * - Source: https://sustainabletravel.org/our-work/carbon-offsets/calculate-footprint/
 * - Using 0.6 tons as average domestic round-trip
 * 
 * FOOD:
 * - Beef: 27 kg CO2eq per kg (US average, lower than global 60kg)
 * - Source: Our World in Data / Poore & Nemecek 2018
 * - https://ourworldindata.org/food-choice-vs-eating-local
 * - Assuming 200g beef per meal: 0.2kg * 27 = 5.4 kg = 0.0054 tons/meal
 * 
 * - Other meat (chicken/pork): ~6-7 kg CO2eq per kg
 * - 200g meal = 0.2 * 6.5 = 1.3 kg = 0.0013 tons/meal
 * 
 * - Dairy: ~3 kg CO2eq per kg
 * - Source: Our World in Data
 * 
 * HOME ENERGY:
 * - Average US home: 6.8 metric tons CO2/year
 * - Source: FHFA research paper 2024
 * - Electricity: 823 lbs CO2 per MWh (EPA 2024)
 * - Source: https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references
 */

// Vehicle emissions (metric tons CO2 per mile)
// EPA says 400g/mile for average car = 0.0004 tons
const carEmissionsPerMile = {
  'electric': 0.00010,    // ~75% lower than gas (grid-dependent)
  'hybrid': 0.00025,      // ~40% lower than gas
  'gasoline': 0.00040,    // EPA average
  'truck-suv': 0.00055    // ~35% higher than average car
};

// Flight emissions (metric tons per round-trip)
// Based on Sustainable Travel International calculator
const flightEmissions = 0.6; // Average domestic round-trip

// Public transit: ~0.15 kg CO2/mile per passenger
const publicTransitPerMile = 0.00018;

// Home size multipliers (relative to medium home)
const homeSizeMultiplier = {
  'apartment': 0.5,
  'small': 0.75,
  'medium': 1.0,
  'large': 1.5
};

// Electricity emissions (metric tons/year for medium home)
// Based on grid mix - US average ~4 tons from electricity
const energyEmissions = {
  'renewable': 0.5,
  'mixed': 4.0,
  'coal': 6.0
};

// Heating emissions (metric tons/year)
// Natural gas heating: ~2 tons/year for average home
const heatingEmissions = {
  'electric': 0.8,
  'gas': 2.0,
  'oil': 3.0
};

// Water heater (metric tons/year)
const waterHeaterEmissions = {
  'electric': 0.4,
  'gas': 0.8,
  'solar': 0.05
};

// Food emissions (metric tons per meal/serving)
// Beef: 27 kg CO2/kg * 0.2kg/meal = 5.4kg = 0.0054 tons
const beefEmissionsPerMeal = 0.0054;
// Chicken/pork: ~6.5 kg CO2/kg * 0.2kg = 1.3kg = 0.0013 tons
const otherMeatEmissionsPerMeal = 0.0013;
// Dairy: ~3 kg CO2/kg, assume 0.25kg serving = 0.75kg = 0.00075 tons
const dairyEmissionsPerServing = 0.00075;

// Shopping/consumption (metric tons/year)
// Rough estimates based on consumption studies
const shoppingEmissions = {
  'minimal': 0.5,
  'average': 2.0,
  'frequent': 4.0
};

// Food waste multiplier
const foodWasteMultiplier = {
  'low': 0.9,
  'average': 1.0,
  'high': 1.2
};

// Derived calculations
export const carTotal = derived(
  [milesPerWeek, carType], 
  ([$miles, $type]) => $miles * 52 * carEmissionsPerMile[$type]
);

export const transitTotal = derived(
  publicTransitMiles,
  $miles => $miles * 52 * publicTransitPerMile
);

export const flightTotal = derived(flightsPerYear, $f => $f * flightEmissions);

export const foodTotal = derived(
  [beefMealsPerWeek, otherMeatMeals, dairyServingsPerDay, foodWaste],
  ([$beef, $meat, $dairy, $waste]) => {
    const base = ($beef * 52 * beefEmissionsPerMeal) + 
                 ($meat * 52 * otherMeatEmissionsPerMeal) + 
                 ($dairy * 365 * dairyEmissionsPerServing) + 
                 0.5; // baseline for grains, vegetables, etc
    return base * foodWasteMultiplier[$waste];
  }
);

export const homeTotal = derived(
  [homeSize, homeEnergy, heatingType, waterHeater, peopleInHome],
  ([$size, $energy, $heat, $water, $people]) => {
    const base = energyEmissions[$energy] + heatingEmissions[$heat] + waterHeaterEmissions[$water];
    const adjusted = base * homeSizeMultiplier[$size];
    // Per-capita: divide by sqrt of people (shared infrastructure)
    return adjusted / Math.sqrt($people);
  }
);

export const shoppingTotal = derived(shoppingHabit, $s => shoppingEmissions[$s]);

export const totalFootprint = derived(
  [carTotal, transitTotal, flightTotal, foodTotal, homeTotal, shoppingTotal],
  ([$car, $transit, $flight, $food, $home, $shop]) => $car + $transit + $flight + $food + $home + $shop
);