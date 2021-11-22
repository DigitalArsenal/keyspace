<script lang="ts">
  import { Buffer } from "buffer";
  import {
    masterNode,
    xpubMasterNode,
    Seed,
    bip39Phrase,
  } from "../stores/userprofile.store";
  import * as ethers from "ethers";
  import QRCode from "qrcode";
  import { push } from "svelte-spa-router";
  const { entropyToMnemonic } = globalThis.bitcoinjs.bip39;
  const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
    }
  };

  const { HDNode: ethHDNode } = ethers.utils;
  let { payments } = globalThis.bitcoinjs;

  let btcAddress,
    btcSegWitAddress,
    ethAddress,
    xpriv,
    xpub,
    doExport = false;

  let api_servers = [
    "https://api.blockcypher.com/v1/btc/main/addrs/",
    "https://blockchain.info/rawaddr/",
  ];

  /*
    TODO:
    1. Generate HARDENED and NON-HARDENED addresses.
    2. Create a mapping for derivation path (probably in a store or something)

  */
  masterNode.subscribe(async (mN) => {
    if (!mN) return;
    let bip44Account = mN.derivePath("m/44'/0'/0'/0/0");
    const { address } = payments.p2pkh({
      pubkey: bip44Account.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });
    btcAddress = address;

    let bip84Account = mN.derivePath("m/84'/0'/0'/0/0");
    const { address: swaddress } = payments.p2wpkh({
      pubkey: bip84Account.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });
    btcSegWitAddress = swaddress;

    xpub = mN.neutered().toBase58();

    if (!$Seed) return;
    let ethNode = ethHDNode.fromSeed($Seed);
    let firstWallet = ethNode.derivePath(`m/44'/60'/0'/0/0`);
    ethAddress = firstWallet.address;
  });

  xpubMasterNode.subscribe(async (xMN) => {
    if (!xMN) return;
    xpub = xMN.neutered().toBase58();
    let bip44Account = xMN.derive(0).derive(0);
    const { address } = payments.p2pkh({
      pubkey: bip44Account.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });
    btcAddress = address;
  });

  const exportKey = (e) => {
    doExport = !doExport;
  };
</script>

<div class="text-gray-800 w-full h-screen flex items-center justify-center">
  <div
    class="bg-gray-200 w-auto m-10 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center">
    <div class="text-2xl mb-10">Account Addresses</div>
    <!--<h1 class="mb-5">
      XPUB: {xpub}
    </h1>-->
    <h1 class="mb-5">
      BTC:
      <a
        class="text-blue-600"
        href="https://www.blockchain.com/btc/address/{btcAddress}">
        {btcAddress}
      </a>
    </h1>
    <h1 class="mb-5">
      BTC (SegWit):
      <a
        class="text-blue-600"
        href="https://www.blockchain.com/btc/address/{btcSegWitAddress}">
        {btcSegWitAddress}
      </a>
    </h1>
    <h1 class="mb-5">
      ETH:
      <a class="text-blue-600" href="https://etherscan.io/address/{ethAddress}">
        {ethAddress}
      </a>
    </h1>
    <button
      on:click={exportKey}
      class="w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
      {doExport ? "Hide" : "Export"}
    </button>
    <textarea
      class:hidden={!doExport}
      class="w-9/12 h-40 font-bold py-2 px-4 rounded mt-10"
      bind:value={$bip39Phrase} />
  </div>
</div>
