<script lang="ts">
  //@ts-nocheck
  import { onMount } from "svelte";
  import { hashAlgorithms, hashAlgorithm } from "../stores/userprofile.store";

  const descriptions = {
    argon2: `Argon2 is a password-hashing function that summarizes the state of the art in the design of memory-hard functions and can be used to hash passwords for credential storage, key derivation, or other applications.`,
    pbkdf2: `PBKDF2 is a simple cryptographic key derivation function, resistant to dictionary attacks and rainbow table attacks. It is based on iteratively deriving HMAC (with padding).`,
  };

  const _checkedState = { argon2: false, pbkdf2: false };
  let checkedState = _checkedState;
  const changeSelect = (value) => {
    checkedState = _checkedState;
    checkedState[value] = true;
    $hashAlgorithm = value;
  };
  onMount(() => {
    changeSelect($hashAlgorithm);
  });
</script>

<div>
  <div class="text-4xl mt-8">SETTINGS</div>
  <div class="grid grid-rows-3 grid-flow-col gap-4 m-12">
    <div class="widget-div">
      <span class="text-gray-700">HASH ALGORITHM (FOR LOGIN)</span>
      <div class="mt-2">
        {#each Object.keys(hashAlgorithms) as hA, h}
          <label class="flex items-center">
            <input
              on:change={({ target: { value } }) => changeSelect(value)}
              checked={checkedState[hA]}
              type="radio"
              class="form-radio"
              name="_hashAlgorithm"
              value={hA} />
            <span class="m-2" title={descriptions[hA]}>{hA.toUpperCase()}</span>
          </label>
        {/each}
      </div>
    </div>
    <div class="widget-div centered">
      <div />
    </div>
    <div class="widget-div centered">
      <div />
    </div>
    <div class="widget-div centered">
      <div />
    </div>
    <div class="widget-div centered">
      <div />
    </div>
    <div class="widget-div centered">
      <div />
    </div>
    <div class="widget-div centered">
      <div />
    </div>
    <div class="widget-div centered">
      <div />
    </div>
  </div>
</div>

<style>
  .widget-div {
    @apply rounded-md border-gray-500 border-1 p-4 shadow-lg;
  }
  .centered {
    @apply flex items-center justify-center place-items-center;
  }
  .widget-div {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
  }
</style>
