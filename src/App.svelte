<script>
  import Header from './Header.svelte';
  import InputControls from './InputControls.svelte';
  import Results from './Results.svelte';
</script>

<div class="container">
  <Header />
  <div class="calculator">
    <InputControls />
    <Results />
  </div>
</div>
<style>
  :global(body) {
    margin: 0;
    padding: 2rem 3rem;
    background: #fff;
    font-family: system-ui, -apple-system, sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .calculator {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  @media (max-width: 1000px) {
    .calculator {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>