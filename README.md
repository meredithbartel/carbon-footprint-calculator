# Carbon Footprint Calculator

An interactive web application that helps users understand their personal carbon emissions through lifestyle inputs and real-time visual feedback. Built to make climate impact tangible, comparable, and actionable.

**Live Site**: https://carbon-footprint-calculator-meredith.netlify.app/


**Live Demo**: https://www.loom.com/share/caf3a499862140439543af069e687286

### Why Carbon Footprints

Climate change is one of the most pressing challenges of our time, yet most people have no intuitive sense of their personal contribution to the problem or what actions would actually make a difference. This calculator bridges that gap by translating abstract emissions data into concrete, personalized numbers.



## The Problem

### The Knowledge Gap

Most people dramatically misunderstand what matters for reducing their environmental impact:

- **Overestimated impact**: Plastic straws, turning off lights, recycling
- **Underestimated impact**: Flying, beef consumption, home heating

A 2020 study found that people consistently underestimate the carbon footprint of high-impact activities like air travel by a factor of 2-10x, while overestimating the impact of low-impact activities.
### What does a ton of CO2 look like?
<img width="720" height="536" alt="image" src="https://github.com/user-attachments/assets/be63d249-f07d-4ed1-bfdd-141e97a0c16d" />

### Existing Solutions Fall Short

Many carbon calculators suffer from:

1. **Too complex**: Requiring utility bills, exact mileage, flight records
2. **No context**: Showing a number without explaining if it's good or bad
3. **No breakdown**: Not showing which behaviors contribute most
4. **Outdated data**: Using emission factors from decades ago
5. **Poor UX**: Clunky multi-page forms instead of real-time feedback
---

## Sketches
<img width="742" height="592" alt="image" src="https://github.com/user-attachments/assets/1d3ff4c8-6ec3-4c2e-a2ae-4bafc65e93d7" />

### My Approach

This calculator prioritizes:

- **Simplicity**: Estimate-friendly inputs (meals per week, not grams of beef)
- **Context**: Compare against sustainable targets, global averages, and US averages
- **Actionability**: Visual breakdown shows where to focus reduction efforts
- **Transparency**: Every calculation links to its source
- **Responsiveness**: Real time updates as inputs change


## Design Process

### Research Phase

1. **Competitive analysis** of existing carbon calculators (EPA, CoolClimate, Carbon Footprint Ltd)
2. **Literature review** of emission factors from peer-reviewed sources
3. **User interviews** to understand mental models around carbon emissions

## User Feedback & Iterations

### Testing Round 1 

| Feedback | Change Made |
|----------|-------------|
| "What does 'mixed grid' mean?" | Added clearer option labels with descriptions |
| "I want to see what changed" | Numbers update in real-time as you type |

### Testing Round 2 

| Feedback | Change Made |
|----------|-------------|
| "I don't eat beef but I eat chicken" | Split into "beef meals" and "other meat meals" |
| "Where did you get these numbers?" | Added source links below each section |
| "What's a sustainable target?" | Added labels to comparison scale benchmarks |


## Features

### Interactive Inputs

| Category | Inputs |
|----------|--------|
| **Transportation** | Weekly driving miles, vehicle type, public transit miles, flights per year |
| **Home** | Household size, home size, electricity source, heating type, water heater |
| **Consumption** | Beef meals/week, other meat meals/week, dairy servings/day, shopping habits, food waste level |

### Real-Time Results

- **Total footprint** in tons CO₂/year
- **Category breakdown** with proportional bar charts
- **Tangible equivalents**:
  - Trees needed to offset annually
  - Equivalent miles driven
  - Percentage of US average

### Comparison Scale

A gradient visualization showing where the user falls relative to:

| Benchmark | Value | Significance |
|-----------|-------|--------------|
| **Sustainable target** | 2 tons/year | Required to limit warming to 1.5°C |
| **Global average** | 4 tons/year | Average human on Earth |
| **US average** | 16 tons/year | Average American |

### Contextual Verdict

Dynamic text feedback based on where the user's footprint falls:

- Below 2t: "Excellent — below sustainable target"
- 2-4t: "Below global average, above sustainable target"
- 4-16t: "Below US average, above global average"
- Above 16t: "Above US average"
##Color Scheme
<img width="1378" height="260" alt="image" src="https://github.com/user-attachments/assets/677c21c8-2f7c-4b98-9051-000db0164d53" />
Not very many reasons for the color scheme
## Quick  Stats section
<img width="1328" height="175" alt="image" src="https://github.com/user-attachments/assets/398029a5-5c01-4c11-a649-3b746e6b1986" />

---

## How the Calculations Work

### Transportation
```
Car emissions = (miles/week) × 52 × (emission factor by vehicle type)

Emission factors (tons CO₂/mile):
- Electric:    0.00010 (grid-dependent, ~75% lower than gas)
- Hybrid:      0.00025 (~40% lower than gas)
- Gasoline:    0.00040 (EPA average)
- Truck/SUV:   0.00055 (~35% higher than average)

Flight emissions = (round trips/year) × 0.6 tons
- Based on average domestic round-trip

Transit emissions = (miles/week) × 52 × 0.00018 tons/mile
- CBO average for bus transit
```

### Home Energy

```
Home emissions = (electricity + heating + water heater) × size multiplier / √(people)

Electricity (tons/year by grid mix):
- Renewable: 0.5
- Mixed:     4.0
- Coal:      6.0

Heating (tons/year):
- Electric/Heat pump: 0.8
- Natural gas:        2.0
- Oil/Propane:        3.0

Water heater (tons/year):
- Electric: 0.4
- Gas:      0.8
- Solar:    0.05

Size multipliers:
- Apartment: 0.5
- Small:     0.75
- Medium:    1.0
- Large:     1.5

Per-capita adjustment: Divide by √(household size)
- Accounts for shared infrastructure
- 2 people ≠ 2× emissions
```
### Food
```
Food emissions = (beef + other meat + dairy + baseline) × waste multiplier

Beef:       (meals/week) × 52 × 0.0054 tons/meal
            Based on 200g serving × 27 kg CO₂/kg (US beef average)

Other meat: (meals/week) × 52 × 0.0013 tons/meal
            Based on 200g serving × 6.5 kg CO₂/kg (chicken/pork average)

Dairy:      (servings/day) × 365 × 0.00075 tons/serving
            Based on 250g serving × 3 kg CO₂/kg

Baseline:   0.5 tons/year for grains, vegetables, fruits

Waste multipliers:
- Low:     0.9
- Average: 1.0
- High:    1.2
```

### Shopping/Consumption
```
Shopping emissions (tons/year):
- Minimal:  0.5  (necessities only, secondhand)
- Average:  2.0  (occasional new purchases)
- Frequent: 4.0  (regular new purchases)
```

### Equivalents
```
Trees needed = total footprint × 45
- Average tree absorbs ~22 kg CO₂/year
- 45 trees ≈ 1 ton offset

Miles equivalent = total footprint × 2500
- Based on average car at 0.0004 tons/mile

Percent of US = (total footprint / 16) × 100
```

---

## Data Sources

All emission factors are derived from peer-reviewed research and government data:

### Transportation

| Factor | Value | Source |
|--------|-------|--------|
| Average car | 400g CO₂/mile | [EPA Green Vehicles](https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle) |
| Domestic flight | 0.4-1.1 tons/round-trip | [ICCT Aviation Report](https://theicct.org/publication/co2-emissions-from-commercial-aviation-2013-2018-and-2019/) |
| Bus transit | 0.39 lbs/passenger-mile | [CBO Transportation Emissions](https://www.cbo.gov/publication/58861) |

### Food

| Factor | Value | Source |
|--------|-------|--------|
| Beef | 27 kg CO₂eq/kg (US) | [Our World in Data](https://ourworldindata.org/food-choice-vs-eating-local) |
| Chicken/Pork | 6-7 kg CO₂eq/kg | [Poore & Nemecek 2018](https://www.science.org/doi/10.1126/science.aaq0216) |
| Dairy | ~3 kg CO₂eq/kg | [Our World in Data](https://ourworldindata.org/environmental-impacts-of-food) |

### Home Energy

| Factor | Value | Source |
|--------|-------|--------|
| Grid electricity | 823 lbs CO₂/MWh | [EPA Equivalencies Calculator](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references) |
| Average US home | 6.8 tons/year | [FHFA Research](https://www.fhfa.gov/document/wp2405.pdf) |
| Natural gas heating | ~2 tons/year | [EIA Residential Energy](https://www.eia.gov/consumption/residential/) |

### Benchmarks

| Benchmark | Value | Source |
|-----------|-------|--------|
| Sustainable target | 2 tons/person/year | [IPCC 1.5°C Report](https://www.ipcc.ch/sr15/) |
| Global average | 4 tons/person/year | [Our World in Data](https://ourworldindata.org/co2-emissions) |
| US average | 16 tons/person/year | [Our World in Data](https://ourworldindata.org/co2-emissions) |
## Future Improvements

### Additional Input Categories

| Category | Inputs to Add | Why |
|----------|---------------|-----|
| **Water Usage** | Shower length, lawn watering, pool | Water heating and treatment have significant emissions |
| **Electronics** | Phone/laptop replacements per year | E-waste and manufacturing footprint |
| **Clothing** | New clothing purchases per month | Fast fashion is a major emissions source |
| **Streaming** | Hours of video streaming per day | Data centers have growing energy demands |
| **Pet Ownership** | Type and size of pets | Pet food (especially for dogs/cats) has notable impact |

## Screenshots

### Full Interface
<img width="673" height="826" alt="image" src="https://github.com/user-attachments/assets/4a43668c-3a09-45f8-a437-509178593a85" />
