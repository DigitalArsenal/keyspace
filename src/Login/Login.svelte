<script lang="ts">
  import {
    hashAlgorithmWorker,
    masterNode,
    entropyLength,
    Seed,
    bip39Phrase,
  } from "../stores/userprofile.store";
  import { get } from "svelte/store";
  const bitcoinJSHDNode = globalThis.bitcoinjs.bip32;
  import Loading from "../widgets/Loading.svelte";
  import { push, pop, replace } from "svelte-spa-router";
  const { entropyToMnemonic, mnemonicToSeed } = globalThis.bitcoinjs.bip39;
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

    hWorker.postMessage({
      username,
      password,
      pin: parseInt(pin),
      entropyLength: $entropyLength,
    });
    hWorker.addEventListener("message", async (e) => {
      let entropy = Buffer.from(e.data.buffer);
      bip39Phrase.set(await entropyToMnemonic(entropy));
      $Seed = await mnemonicToSeed(get(bip39Phrase));
      $masterNode = bitcoinJSHDNode.fromSeed($Seed);
      push("/userprofile");
    });
  };
</script>

{#if loading}
  <Loading {message} />
{/if}
<form on:submit={handleOnSubmit} method="post">
  <div class="text-gray-800 w-full h-screen flex items-center justify-center">
    <div
      class="bg-gray-200 w-96 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center">
      <label for="" class="font-light text-4xl mb-4">
        key<span class="font-bold">space</span></label>
      <input
        type="email"
        id="userEmail"
        placeholder="Email address"
        class="w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4"
        bind:value={username} />
      <input
        type="password"
        class="w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4"
        id="userPass"
        placeholder="Password"
        minlength="16"
        bind:value={password}
        required />
      <input
        bind:value={pin}
        class="w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4"
        type="password"
        name="pin"
        pattern={String.raw`[0-9]{${pinLength[0]},${pinLength[1]}}`}
        placeholder="PIN ({pinLength[0]} - {pinLength[1]}) Digits"
        title=""
        on:invalid={(e) => showPINError(e)}
        minlength={pinLength[0]}
        maxlength={pinLength[1]} />
      <button
        class="w-full h-12 rounded-lg bg-blue-600 text-gray-200 uppercase font-semibold hover:bg-blue-700 text-gray-100 transition mb-4"
        >Login</button>
      <label for="" class="text-gray-800 mb-4">or</label>
      <button
        on:click={(e) => {
          push("/importkey");
        }}
        class="w-full h-12 rounded-lg bg-red-600 text-gray-200 uppercase font-semibold hover:bg-red-700 text-gray-100 transition mb-4"
        >Import Key</button>
    </div>
  </div>
</form>
