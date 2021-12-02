<script>
  import Icon from "svelte-awesome";
  import * as Routes from "../routes/routes.svelte";
  import Logout from "../Logout/Logout.svelte";
  import { push } from "svelte-spa-router";
  let { routes } = Routes;

  let open = false;
  let close = () => (open = false);

  const doNav = (e, route) => {
    push(route[0]);
    close();
  };
</script>

<div
  class="z-20 fixed ml-2 mt-4 space-y-2 cursor-pointer"
  on:click={() => {
    open = !open;
  }}>
  <span class:topen={open} class="transition-all block w-8 h-0.5 bg-gray-100" />
  <span class:invisible={open} class="block w-8 h-0.5 bg-gray-100" />
  <span class:bopen={open} class="transition-all block w-8 h-0.5 bg-gray-100" />
</div>
<div
  class:sidenavOpen={open}
  class="sidenav z-10 h-screen select-none filter drop-shadow-lg border-r-1h border-gray-600 flex flex-col pt-12 gap-5 justify-start bg-blue-900 w-56">
  {#each Object.entries(routes) as route, r}
    {#if route[1].icon}
      <div
        on:click={(e) => doNav(e, route)}
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
  <Logout {close} />
</div>

<style>
  .sidenav {
    left: -100%;
    position:fixed;
    will-change: left;
    transform: translate3d(0, 0, 0);
    box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.65);
  }
  .sidenav.sidenavOpen {
    left: 0px;
  }
  .topen {
    transform: translate3d(0, 0, 0);
    @apply transform translate-y-2.5 rotate-45;
  }
  .bopen {
    transform: translate3d(0, 0, 0);
    @apply transform -translate-y-2.5 -rotate-45;
  }
</style>
