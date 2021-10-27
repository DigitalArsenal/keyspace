<script lang="ts">
  import {
    hashAlgorithmWorker,
    masterNode,
    privateKey,
  } from "../stores/userprofile.store";
  const bitcoinJSHDNode = globalThis.bitcoinjs.bip32;
  import Loading from "../widgets/Loading.svelte";

  let username,
    password,
    pin,
    passwordRules = `At least 16 characters`,
    pinLength = [1, 2],
    loading,
    message = "Generating keys, this may take a few seconds.";

  const showPINError = (e) => {
    e.target.setCustomValidity(
      `PIN should be between ${pinLength[0]} and ${pinLength[1]} numerals`
    );
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    loading = true;
    const hWorker = new $hashAlgorithmWorker();

    hWorker.postMessage({ username, password, pin: parseInt(pin) });
    hWorker.addEventListener("message", (e) => {
      $privateKey = Buffer.from(e.data.buffer);
      $masterNode = bitcoinJSHDNode.fromSeed(Buffer.from(e.data.buffer));
    });
  };
</script>

{#if loading}
  <Loading {message} />
{/if}
<form on:submit={handleOnSubmit} method="post" class="mt-8 mb-4">
  <div class="mb-4">
    <label for="userEmail" class="sr-only">Email address</label>
    <input
      bind:value={username}
      class="border-solid w-80 border border-gray-400 rounded px-2 py-3"
      type="email"
      id="userEmail"
      placeholder="Email address"
      required />
  </div>
  <div class="mb-4">
    <label for="userEmail" class="sr-only">Password</label>
    <input
      bind:value={password}
      class="border-solid w-80 border border-gray-400 rounded px-2 py-3"
      type="password"
      id="userPass"
      placeholder="Password"
      minlength="16"
      title={passwordRules}
      required />
  </div>
  <div class="mb-4">
    <label for="PIN" class="sr-only">PIN</label>
    <input
      bind:value={pin}
      class="border-solid w-80 border border-gray-400 rounded px-2 py-3"
      type="password"
      name="pin"
      pattern={String.raw`[0-9]{${pinLength[0]},${pinLength[1]}}`}
      placeholder="PIN ({pinLength[0]} - {pinLength[1]}) Digits"
      title=""
      on:invalid={(e) => showPINError(e)}
      minlength={pinLength[0]}
      maxlength={pinLength[1]} />
  </div>
  <button
    class="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3"
    type="submit">Sign in</button>
</form>
