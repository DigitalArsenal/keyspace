<script>
  import SideNav from "./SideNav/SideNav.svelte";
  import Routes from "./routes/routes.svelte";
</script>

<div class="container w-full max-h-full h-full h-screen grid grid-top-row">
  <SideNav />
  <main>
    <Routes />
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
