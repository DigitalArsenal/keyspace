<script lang="ts">
  import { Buffer } from "buffer";
  import { masterNode } from "../stores/userprofile.store";
  import createKeccakHash from "keccak";
  import { toChecksumAddress } from "ethereum-checksum-address";

  let { payments } = globalThis.bitcoinjs;

  let btcAddress, btcSegWitAddress, ethAddress;

  let api_servers = ["https://api.blockcypher.com/v1/btc/main/addrs/", "https://blockchain.info/rawaddr/"];

  masterNode.subscribe(async (kP) => {
    let bip44Account = $masterNode.deriveHardened(44).deriveHardened(0).deriveHardened(0).derive(0).derive(0);
    const { address } = payments.p2pkh({ pubkey: bip44Account.publicKey, network: globalThis.bitcoinjs.bitcoin });
    btcAddress = address;
    /*try {
      console.log(
        await (await fetch(`${api_servers[0]}${btcAddress}`))
          .json()
          .catch((e) => {})
      );
    } catch (e) {}*/
    let bip84Account = $masterNode.deriveHardened(84).deriveHardened(0).deriveHardened(0).derive(0).derive(0);
    const { address: swaddress } = payments.p2wpkh({ pubkey: bip84Account.publicKey, network: globalThis.bitcoinjs.bitcoin });
    btcSegWitAddress = swaddress;

    ethAddress = "TODO"; //toChecksumAddress(`${keccakHex.substring(keccakHex.length - 40, keccakHex.length).toUpperCase()}`);
  });
</script>

<div class="text-2xl mb-10">ADDRESS</div>
<h1 class="mb-5">
  BTC:
  <a class="text-blue-600" href="https://www.blockchain.com/btc/address/{btcAddress}"> {btcAddress}</a>
</h1>
<h1 class="mb-5">
  BTC (SegWit):
  <a class="text-blue-600" href="https://www.blockchain.com/btc/address/{btcSegWitAddress}"> {btcSegWitAddress}</a>
</h1>
<h1 class="mb-5">
  ETH:
  <a class="text-blue-600" href="https://etherscan.io/address/{ethAddress}"> {ethAddress}</a>
</h1>
<button
  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
  on:click={(e) => {
    $masterNode = null;
  }}
>
  Clear
</button>

<style></style>
