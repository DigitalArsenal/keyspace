<script lang="ts">
  import Grid from "./Grid.widget/Grid.svelte";
</script>

<div class="container max-w-full w-full h-full grid grid-rows-2">
  <nav class="bg-blue-900 shadow-lg">
    <div class="container mx-auto">
      <div class="sm:flex">
        <a href={"#"} class="text-white text-3xl font-bold p-3">KEYSPACE</a>

        <!-- Menus -->
        <div class="ml-55 mt-4">
          <ul class="text-white sm:self-center text-xl">
            <li class="sm:inline-block">
              <a href={"#"} class="p-3 hover:text-red-900">Account</a>
            </li>
            <li class="sm:inline-block">
              <a href={"#"} class="p-3 hover:text-red-900">Peers</a>
            </li>
            <li class="sm:inline-block">
              <a href={"#"} class="p-3 hover:text-red-900">Data</a>
            </li>
            <li class="sm:inline-block">
              <a href={"#"} class="p-3 hover:text-red-900">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <Grid cssString="height:100%" grid data={[{ test: "a" }]} />
  </main>
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
