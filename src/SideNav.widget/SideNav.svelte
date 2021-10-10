<script>
  import Icon from "svelte-awesome";
  import { routes } from "../routes/routes.svelte";
</script>

<div class="border-r-1h border-gray-600 flex flex-col pt-5 gap-5 justify-start bg-blue-900 w-12">
  {#each Object.values(routes) as route, m}
    <div class="h-12 w-12 flex justify-center align-center items-center text-white cursor-pointer">
      <Icon class="w-max" scale={2} data={route.icon} />
    </div>
  {/each}
</div>
