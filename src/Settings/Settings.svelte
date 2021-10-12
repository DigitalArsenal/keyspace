<script lang="ts">
  //@ts-nocheck
  import { onMount } from "svelte";
  import { hashAlgorithms, hashAlgorithm } from "../stores/userprofile.store";

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
  <div class="mt-4">
    <span class="text-gray-700">Hash Algorithm For Login</span>
    <div class="mt-2">
      {#each Object.keys(hashAlgorithms) as hA, h}
        <label class="inline-flex items-center">
          <input
            on:change={({ target: { value } }) => changeSelect(value)}
            checked={checkedState[hA]}
            type="radio"
            class="form-radio"
            name="_hashAlgorithm"
            value={hA} />
          <span class="m-2">{hA.toUpperCase()}</span>
        </label>
      {/each}
    </div>
  </div>
</div>
