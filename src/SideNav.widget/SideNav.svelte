<script>
  import Icon from "svelte-awesome";
  import { user, addressBook, database } from "svelte-awesome/icons";

  let menuItems = [{ icon: user }, { icon: addressBook }, { icon: database }];
</script>

<div
  class="border-r-1h border-gray-600 flex flex-col pt-5 gap-5 justify-start bg-blue-500 w-12">
  {#each menuItems as item, m}
    <div
      class="h-12 w-12 flex justify-center align-center items-center text-white cursor-pointer">
      <Icon class="w-max" scale={2} data={item.icon} />
    </div>
  {/each}
</div>
