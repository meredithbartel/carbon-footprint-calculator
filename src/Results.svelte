<script>
  import { carTotal, flightTotal, foodTotal, homeTotal, shoppingTotal, totalFootprint } from './stores.js';
  
  $: treesNeeded = Math.round($totalFootprint * 45);
  $: milesEquivalent = Math.round($totalFootprint * 2500);
  $: percentOfUS = (($totalFootprint / 16) * 100).toFixed(1);
  $: youPosition = Math.min(($totalFootprint / 20) * 100, 100);
  
  const sustainableTarget = 2;
  const globalAverage = 4;
  const usAverage = 16;
</script>

<div class="results">
  <h2>Your Footprint</h2>
  
  <div class="total">
    <span class="number">{$totalFootprint.toFixed(2)}</span>
    <span class="unit">tons CO₂/year</span>
  </div>
  
  <div class="breakdown">
    <div class="bar-item">
      <span class="label">Driving</span>
      <div class="bar-container">
        <div class="bar" style="width: {($carTotal / $totalFootprint) * 100}%; background: #3b82f6;"></div>
      </div>
      <span class="amount">{$carTotal.toFixed(2)}t</span>
    </div>
    <div class="bar-item">
      <span class="label">Flights</span>
      <div class="bar-container">
        <div class="bar" style="width: {($flightTotal / $totalFootprint) * 100}%; background: #8b5cf6;"></div>
      </div>
      <span class="amount">{$flightTotal.toFixed(2)}t</span>
    </div>
    <div class="bar-item">
      <span class="label">Food</span>
      <div class="bar-container">
        <div class="bar" style="width: {($foodTotal / $totalFootprint) * 100}%; background: #f59e0b;"></div>
      </div>
      <span class="amount">{$foodTotal.toFixed(2)}t</span>
    </div>
    <div class="bar-item">
      <span class="label">Home</span>
      <div class="bar-container">
        <div class="bar" style="width: {($homeTotal / $totalFootprint) * 100}%; background: #22c55e;"></div>
      </div>
      <span class="amount">{$homeTotal.toFixed(2)}t</span>
    </div>
    <div class="bar-item">
      <span class="label">Shopping</span>
      <div class="bar-container">
        <div class="bar" style="width: {($shoppingTotal / $totalFootprint) * 100}%; background: #ef4444;"></div>
      </div>
      <span class="amount">{$shoppingTotal.toFixed(2)}t</span>
    </div>
  </div>

  <div class="equivalents">
    <div class="equiv-item">
      <span class="equiv-value">{treesNeeded}</span>
      <span class="equiv-label">trees to offset</span>
    </div>
    <div class="equiv-item">
      <span class="equiv-value"> {milesEquivalent.toLocaleString()}</span>
      <span class="equiv-label">miles equivalent</span>
    </div>
    <div class="equiv-item">
      <span class="equiv-value">{percentOfUS}%</span>
      <span class="equiv-label">of US average</span>
    </div>
  </div>

  <div class="scale-section">

    <h3>How you compare</h3>
    <div class="section-divider"></div>
Header
    <div class="scale-wrapper">
      <div class="scale-gradient">
        <div class="benchmark-line" style="left: {(sustainableTarget / 20) * 100}%"></div>
        <div class="benchmark-line" style="left: {(globalAverage / 20) * 100}%"></div>
        <div class="benchmark-line" style="left: {(usAverage / 20) * 100}%"></div>
        
        <div class="you-pin" style="left: {youPosition}%">
          <span class="you-bubble">{$totalFootprint.toFixed(1)}t</span>
          <span class="you-arrow">▼</span>
        </div>
      </div>
      
      <div class="scale-range">
        <span>0</span>
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>20 tons</span>
      </div>
      
      <div class="benchmark-labels">
        <div class="benchmark" style="left: {(sustainableTarget / 20) * 100}%">
          <span class="b-value">{sustainableTarget}t</span>
          <span class="b-name">Sustainable</span>
        </div>
        <div class="benchmark" style="left: {(globalAverage / 20) * 100}%">
          <span class="b-value">{globalAverage}t</span>
          <span class="b-name">Global avg</span>
        </div>
        <div class="benchmark" style="left: {(usAverage / 20) * 100}%">
          <span class="b-value">{usAverage}t</span>
          <span class="b-name">US avg</span>
        </div>
      </div>
    </div>
  </div>

  <div class="verdict">
    {#if $totalFootprint < sustainableTarget}
      ✓ You're below the sustainable target of {sustainableTarget}t — excellent.
    {:else if $totalFootprint < globalAverage}
      You're below the global average ({globalAverage}t), but above the sustainable target ({sustainableTarget}t).
    {:else if $totalFootprint < usAverage}
      You're below the US average ({usAverage}t), but above the global average ({globalAverage}t).
    {:else}
      You're above the US average of {usAverage}t.
    {/if}
  </div>
</div>

<style>
  .results {
    padding-left: 1rem;
  }

  h2 {
    margin-top: 0;
    color: #111;
  }

  h3 {
    color: #111;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .total {
    margin-bottom: 1.5rem;
  }

  .number {
    font-size: 4rem;
    font-weight: bold;
    color: #145220;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .unit {
    font-size: 1.1rem;
    color: #333;
    margin-left: 0.5rem;
  }

  .breakdown {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .bar-item {
    display: grid;
    grid-template-columns: 100px 1fr 60px;
    align-items: center;
    gap: 0.75rem;
  }

  .label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
  }

  .bar-container {
    background: #e5e5e5;
    border-radius: 4px;
    height: 18px;
  }

  .bar {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
    min-width: 4px;
  }

  .amount {
    font-weight: 600;
    color: #111;
    text-align: right;
    font-size: 0.9rem;
    font-variant-numeric: tabular-nums;
  }

  .equivalents {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
  }

  .equiv-item {
    display: flex;
    flex-direction: column;
  }

  .equiv-value {
    font-size: 1.25rem;
    font-weight: bold;
    color: #111;
    font-variant-numeric: tabular-nums;
  }

  .equiv-label {
    font-size: 0.8rem;
    color: #555;
  }

  .scale-section {
    margin-bottom: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
  }

  .scale-wrapper {
    position: relative;
  }

  .scale-gradient {
    height: 20px;
    border-radius: 4px;
    background: linear-gradient(to right, #22c55e 0%, #84cc16 20%, #eab308 40%, #f97316 60%, #ef4444 80%, #dc2626 100%);
    position: relative;
  }

  .benchmark-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(0,0,0,0.4);
    transform: translateX(-50%);
  }

  .you-pin {
    position: absolute;
    top: -36px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .you-bubble {
    background: #111;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.85rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .you-arrow {
    color: #111;
    font-size: 1rem;
    line-height: 1;
    margin-top: -4px;
  }

  .scale-range {
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;
    font-size: 0.7rem;
    color: #888;
  }

  .benchmark-labels {
    position: relative;
    height: 40px;
    margin-top: 0.5rem;
  }




 .benchmark {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;
  }

 .benchmark:nth-child(1) {
   transform: translateX(-80%);
 }

 .benchmark:nth-child(2) {
   transform: translateX(-20%);
 }


  .b-value {
    display: block;
    font-weight: bold;
    font-size: 0.85rem;
    color: #111;
  }

  .b-name {
    display: block;
    font-size: 0.7rem;
    color: #555;
    white-space: nowrap;
  }

  .verdict {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    font-size: 0.95rem;
    color: #111;
  }
</style>