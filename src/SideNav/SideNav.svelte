<script>
  import Icon from "svelte-awesome";
  import * as Routes from "../routes/routes.svelte";
  import { push } from "svelte-spa-router";
  let { routes } = Routes;
</script>

<div class="border-r-1h border-gray-600 flex flex-col pt-5 gap-5 justify-start bg-blue-900 w-12">
  {#each Object.entries(routes) as route, r}
    {#if route[1].icon}
      <div on:click={() => push(route[0])} class="h-12 w-12 flex justify-center align-center items-center text-white cursor-pointer">
        <Icon class="w-max" scale={2} data={route[1].icon} />
      </div>
    {/if}
  {/each}
</div>
