<script>
  import Icon from "svelte-awesome";
  import * as Routes from "../routes/routes.svelte";
  import { push } from "svelte-spa-router";
  let { routes } = Routes;

  let open = false;
</script>

<div
  class="z-10 fixed ml-2 mt-4 space-y-2 cursor-pointer"
  on:click={() => {
    open = !open;
  }}>
  <span class:topen={open} class="transition-all block w-8 h-0.5 bg-gray-100" />
  <span class:invisible={open} class="transition-all block w-8 h-0.5 bg-gray-100" />
  <span class:bopen={open} class="transition-all block w-8 h-0.5 bg-gray-100" />
</div>
<div
  style="box-shadow: 2px 0px 2px 0px rgba(0,0,0,0.65); left:{open
    ? '0%'
    : '-100%'}"
  class="h-screen fixed transition-all select-none filter drop-shadow-lg border-r-1h border-gray-600 flex flex-col pt-12 gap-5 justify-start bg-blue-900 w-56">
  {#each Object.entries(routes) as route, r}
    {#if route[1].icon}
      <div
        on:click={() => push(route[0])}
        class="h-12 w-12 grid inline-grid grid-cols-2 gap-12 justify-center items-center text-white cursor-pointer">
        <div class="flex justify-center w-12">
          <Icon class="w-max" scale={2} data={route[1].icon} />
        </div>
        <div class="pl-3">
          {#if route[1]?.name}
            {route[1].name}
          {/if}
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  .topen {
    @apply transform translate-y-2.5 rotate-45;
  }
  .bopen {
    @apply transform -translate-y-2.5 -rotate-45;
  }
</style>
