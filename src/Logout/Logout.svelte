<script lang="ts">
  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    isLoggedIn,
  } from "../stores/keyprofile.store";
  import { push, pop, replace } from "svelte-spa-router";
  export let close;
</script>

{#if $isLoggedIn}
  <div
    class="bg-red-800 flex h-12 w-full justify-center items-center text-white cursor-pointer">
    <div
      on:click={(e) => {
        $masterNode = null;
        $xpubMasterNode = null;
        $xprivMasterNode = null;
        close();
        push("/login");
      }}>
      Logout
    </div>
  </div>
{/if}
