<script lang="ts">
  import {
    hashAlgorithmWorker,
    masterNode,
    entropyLength,
    Seed,
    bip39Phrase,
    xpubMasterNode,
  } from "../stores/userprofile.store";
  import { push, pop, replace } from "svelte-spa-router";
</script>

{#if $masterNode || $xpubMasterNode}
  <div
    on:click={(e) => {
      $masterNode = null;
      $xpubMasterNode = null;
      push("/login");
    }}>
    Logout
  </div>
{/if}
