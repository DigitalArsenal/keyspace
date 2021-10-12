<script lang="ts">
  import bitcoinjs from "../../lib/bitcoinjs/bitcoin.min.mjs";
  let { Buffer, ECPair, payments } = bitcoinjs;
  globalThis.Buffer = Buffer;
  import { keyPair, pkBuffer } from "../stores/userprofile.store";
  import createKeccakHash from "keccak";
  import { toChecksumAddress } from "ethereum-checksum-address";
  import { btc } from "svelte-awesome/icons";

  let btcAddress, btcSegWitAddress, ethAddress;

  keyPair.subscribe((kP) => {
    let keyObj = {
      pubkey: $keyPair.publicKey,
    };
    const { address } = payments.p2pkh(keyObj);
    btcAddress = address;
    const { address: swaddress } = payments.p2wpkh(keyObj);
    btcSegWitAddress = swaddress;
    let keccakHex = createKeccakHash("keccak256")
      .update(Buffer.from($keyPair.publicKey.slice(2), "hex"))
      .digest("hex");
    ethAddress = toChecksumAddress(
      `${keccakHex
        .substring(keccakHex.length - 40, keccakHex.length)
        .toUpperCase()}`
    );
  });
</script>

<div class="text-2xl mb-10">ADDRESS</div>
<h1 class="mb-5">
  BTC:
  <a
    class="text-blue-600"
    href="https://www.blockchain.com/btc/address/{btcAddress}">
    {btcAddress}</a>
</h1>
<h1 class="mb-5">
  BTC (SegWit):
  <a
    class="text-blue-600"
    href="https://www.blockchain.com/btc/address/{btcSegWitAddress}">
    {btcSegWitAddress}</a>
</h1>
<h1 class="mb-5">
  ETH:
  <a class="text-blue-600" href="https://etherscan.io/address/{ethAddress}">
    {ethAddress}</a>
</h1>
<button
  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
  on:click={(e) => {
    $pkBuffer = null;
  }}>
  Clear
</button>

<style></style>
