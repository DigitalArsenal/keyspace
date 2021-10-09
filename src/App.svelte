<script lang="ts">
  import SideNav from "./SideNav.widget/SideNav.svelte";
  import Grid from "./Grid.widget/Grid.svelte";
</script>

<div
  class="container max-w-full w-full max-h-full h-full h-screen grid grid-top-row">
  <SideNav />
  <main>
    <Grid cssString="height:100%" grid data={[{ test: "a" }]} />
  </main>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .grid-top-row {
    grid-template-columns: min-content auto;
  }
  main {
    text-align: center;
  }

  :global(html, body) {
    margin: 0px;
    padding: 0px;
    height: 100vh;
    position: fixed;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
