<script lang="ts">
  import { Buffer } from "buffer";
  import {
    masterNode,
    xpubMasterNode,
    privateKey,
  } from "../stores/userprofile.store";
  import * as ethers from "ethers";
  import QRCode from "qrcode";

  const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
    }
  };

  const { HDNode: ethHDNode } = ethers.utils;
  let { payments } = globalThis.bitcoinjs;

  let btcAddress, btcSegWitAddress, ethAddress, xpriv, xpub;

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

    if (!$privateKey) return;
    let ethNode = ethHDNode.fromSeed($privateKey);
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
</script>

<div class="flex flex-col">
  <div class="text-2xl mb-10">ADDRESS</div>
  <h1 class="mb-5">
    XPUB: {xpub}
  </h1>
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
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
  mt-10"
    on:click={(e) => {
      $masterNode = null;
      $xpubMasterNode = null;
    }}>
    Clear
  </button>
</div>

<style>
</style>
