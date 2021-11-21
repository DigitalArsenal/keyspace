<script>
  import SideNav from "./SideNav/SideNav.svelte";
  import Routes from "./routes/routes.svelte";
</script>
<SideNav />
<div class="bg-gray-800 text-white w-full h-full h-screen grid grid-top-row">
  <main>
    <Routes />
  </main>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .grid-top-row {
    grid-template-columns: auto;
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
