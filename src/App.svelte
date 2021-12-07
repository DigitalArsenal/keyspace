<script>
  import SideNav from "./SideNav/SideNav.svelte";
  import Routes from "./routes/routes.svelte";
  let close;
</script>

<SideNav bind:close />
<div
  on:click={(e) => {
    close();
  }}
  class="bg-gray-800 text-white w-full h-full h-screen">
  <Routes />
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

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
