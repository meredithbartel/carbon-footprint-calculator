<script>
  import { 
    milesPerWeek, carType, flightsPerYear, publicTransitMiles,
    homeSize, homeEnergy, heatingType, peopleInHome, waterHeater,
    beefMealsPerWeek, otherMeatMeals, dairyServingsPerDay, shoppingHabit, foodWaste
  } from './stores.js';
</script>

<div class="inputs">
  <h2>Your Lifestyle</h2>
  
  <section>
    <h3>Transportation</h3>
    
    <div class="input-row">
      <label for="miles">Miles driven per week</label>
      <input id="miles" type="number" bind:value={$milesPerWeek} min="0" max="2000" />
    </div>

    <div class="input-row">
      <label for="carType">Vehicle type</label>
        <select id="carType" bind:value={$carType}>
        <option value="electric">Electric vehicle</option>
        <option value="hybrid">Hybrid</option>
        <option value="gasoline">Gasoline car</option>
        <option value="truck-suv">Truck / SUV</option>
        </select>
    </div>

    <div class="input-row">
      <label for="transit">Public transit miles/week</label>
      <input id="transit" type="number" bind:value={$publicTransitMiles} min="0" max="500" />
    </div>

    <div class="input-row">
      <label for="flights">Round-trip flights per year</label>
      <input id="flights" type="number" bind:value={$flightsPerYear} min="0" max="50" />
    </div>

    <div class="sources">
    <a href="https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle" target="_blank">EPA vehicle data</a>
    <span>·</span>
    <a href="https://theicct.org/publication/co2-emissions-from-commercial-aviation-2013-2018-and-2019/" target="_blank">ICCT flight emissions</a>
    <span>·</span>
    <a href="https://www.cbo.gov/publication/58861" target="_blank">CBO transit emissions</a>
    </div>
  </section>

  <section>
    <h3>Home</h3>

    <div class="input-row">
      <label for="people">People in household</label>
      <input id="people" type="number" bind:value={$peopleInHome} min="1" max="10" />
    </div>

    <div class="input-row">
      <label for="homeSize">Home size</label>
      <select id="homeSize" bind:value={$homeSize}>
        <option value="apartment">Apartment / Condo</option>
        <option value="small">Small house (&lt;1500 sq ft)</option>
        <option value="medium">Medium house (1500-2500 sq ft)</option>
        <option value="large">Large house (&gt;2500 sq ft)</option>
      </select>
    </div>

    <div class="input-row">
      <label for="energy">Electricity source</label>
      <select id="energy" bind:value={$homeEnergy}>
        <option value="renewable">Mostly renewable (solar/wind)</option>
        <option value="mixed">Mixed grid (typical)</option>
        <option value="coal">Mostly fossil fuels</option>
      </select>
    </div>

    <div class="input-row">
      <label for="heating">Heating type</label>
      <select id="heating" bind:value={$heatingType}>
        <option value="electric">Electric / Heat pump</option>
        <option value="gas">Natural gas</option>
        <option value="oil">Oil / Propane</option>
      </select>
    </div>

    <div class="input-row">
      <label for="water">Water heater</label>
      <select id="water" bind:value={$waterHeater}>
        <option value="electric">Electric</option>
        <option value="gas">Gas</option>
        <option value="solar">Solar</option>
      </select>
    </div>

    <div class="sources">
      <a href="https://www.eia.gov/environment/emissions/co2_vol_mass.php" target="_blank">EIA energy data</a>
      <span>·</span>
      <a href="https://www.energy.gov/energysaver/water-heating" target="_blank">DOE water heating</a>
    </div>
  </section>

  <section>
    <h3>Food</h3>

    <div class="input-row">
      <label for="beef">Beef meals per week</label>
      <input id="beef" type="number" bind:value={$beefMealsPerWeek} min="0" max="21" />
    </div>

    <div class="input-row">
      <label for="meat">Other meat meals per week</label>
      <input id="meat" type="number" bind:value={$otherMeatMeals} min="0" max="21" />
    </div>

    <div class="input-row">
      <label for="dairy">Dairy servings per day</label>
      <input id="dairy" type="number" bind:value={$dairyServingsPerDay} min="0" max="10" />
    </div>

    <div class="input-row">
      <label for="waste">Food waste level</label>
      <select id="waste" bind:value={$foodWaste}>
        <option value="low">Low (compost, rarely throw out)</option>
        <option value="average">Average</option>
        <option value="high">High (throw out food often)</option>
      </select>
    </div>

    <div class="sources">
      <a href="https://ourworldindata.org/food-choice-vs-eating-local" target="_blank">Our World in Data - food emissions</a>
      <span>·</span>
      <a href="https://www.science.org/doi/10.1126/science.aaq0216" target="_blank">Poore & Nemecek 2018</a>
    </div>
  </section>

  <section>
    <h3> Shopping</h3>

    <div class="input-row">
      <label for="shopping">Shopping habits</label>
      <select id="shopping" bind:value={$shoppingHabit}>
        <option value="minimal">Minimal (necessities, secondhand)</option>
        <option value="average">Average (occasional new items)</option>
        <option value="frequent">Frequent (regular new purchases)</option>
      </select>
    </div>

    <div class="sources">
      <a href="https://www.nature.com/articles/s41558-021-01212-1" target="_blank">Nature - consumption emissions</a>
    </div>
  </section>
</div>

<style>
  .inputs {
    padding-right: 2rem;
    border-right: 1px solid #e0e0e0;
  }

  h2 {
    margin-top: 0;
    color: #111;
    margin-bottom: 1.5rem;
  }

  h3 {
    color: #111;
    font-size: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e0e0e0;
  }

  section {
    margin-bottom: 2rem;
  }

  .input-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #111;
    flex: 1;
  }

  input[type="number"] {
    width: 100px;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #999;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  input[type="number"]:focus {
    border-color: #145220;
    outline: none;
  }

  select {
    width: 200px;
    padding: 0.5rem;
    font-size: 0.95rem;
    border-radius: 4px;
    border: 1px solid #999;
    background: #fff;
    color: #111;
    cursor: pointer;
  }

  select:hover, select:focus {
    border-color: #145220;
    outline: none;
  }

  .sources {
    margin-top: 0.5rem;
    font-size: 0.7rem;
  }

  .sources a {
    color: #666;
  }

  .sources a:hover {
    color: #145220;
  }

  .sources span {
    color: #ccc;
    margin: 0 0.25rem;
  }
</style>