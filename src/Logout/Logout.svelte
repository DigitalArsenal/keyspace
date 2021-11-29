<script lang="ts">
  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    isLoggedIn,
  } from "../stores/userprofile.store";
  import { push, pop, replace } from "svelte-spa-router";
</script>

{#if $isLoggedIn}
  <div
    class="bg-red-800 flex h-12 w-full justify-center items-center text-white cursor-pointer">
    <div
      on:click={(e) => {
        $masterNode = null;
        $xpubMasterNode = null;
        $xprivMasterNode = null;
        push("/login");
      }}>
      Logout
    </div>
  </div>
{/if}
