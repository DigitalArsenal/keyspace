<script lang="ts">
  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    Seed,
    bip39Phrase,
  } from "../stores/keyprofile.store";
  import * as ethers from "ethers";
  import QRCode from "qrcode";
  import { mnemonicToSeed } from "@ethersproject/hdnode";
  import p2pCrypto from "libp2p-crypto";
  import peerID from "../../lib/peerid.min.js";
  import type PeerId from "../../lib/peerid.min.js";

  const { entropyToMnemonic } = globalThis.bitcoinjs.bip39;
  const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
    }
  };

  const { HDNode: ethHDNode } = ethers.utils;
  let { payments, bip32: HDNode } = globalThis.bitcoinjs;

  let btcAddress,
    btcSegWitAddress,
    ethAddress,
    xpriv,
    hexkey,
    doExport = false,
    activeAccount = 0,
    activeProfile: Exportable.Profile = { accounts: [], mnemonic: null };

  let api_servers = [
    "https://api.blockcypher.com/v1/btc/main/addrs/",
    "https://blockchain.info/rawaddr/",
  ];

  /**
   *   m’ / purpose’ / coin_type’ / account’ / change / address_index
   *
   */
  const { mnemonicToSeedSync } = globalThis.bitcoinjs.bip39;
  const { message } = globalThis.bitcoinjs;

  const initAccount = async (mN) => {
    if (!mN) return;
    console.log($Seed);
    let mnemonic =
      "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

    let _seed = mnemonicToSeedSync(mnemonic);
    const rootNode = HDNode.fromSeed(_seed);
    const accountNode = rootNode.derivePath("m/44'/0'/0'");
    const { address: accountNodeAddress } = payments.p2pkh({
      pubkey: accountNode.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });

    console.log(accountNode.toBase58());
    console.log(accountNode.neutered().toBase58());
    console.log(accountNode.publicKey.toString("hex"));
    console.log(accountNodeAddress);

    var signature = message.sign(
      mnemonic,
      accountNode.privateKey,
      accountNode.compressed
    );
    console.log("SIG", signature.toString("base64"));

    console.log(new Array(50).join("-"));
    const accountFirstAddress = rootNode.derivePath("m/84'/0'/0'/0/0");
    const addressResult = payments.p2wpkh({
      pubkey: accountFirstAddress.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });
    console.log(accountFirstAddress.toBase58());
    console.log(accountFirstAddress.neutered().toBase58());

    console.log(accountFirstAddress.publicKey.toString("hex"));
    console.log(addressResult.address, addressResult);
    var signature = message.sign(
      mnemonic,
      accountFirstAddress.privateKey,
      accountNode.compressed
    );
    console.log("SIG", signature.toString("base64"));

    console.log(new Array(50).join("-"));

    const { p2sh, p2wsh, p2pk } = payments;

    const addressResult49 = p2sh({
      redeem: p2wsh({
        redeem: p2pk({
          pubkey: accountFirstAddress.publicKey,
        }),
      }),
    });
    console.log(addressResult49.address, addressResult);
    var signature = message.sign(
      mnemonic,
      accountFirstAddress.privateKey,
      accountNode.compressed
    );
    console.log("SIG", signature.toString("base64"));

    //This is hard-coded to secp256k1 for BTC and ETH, even though Ed25519 keys are available
    let convertedKey =
      new p2pCrypto.keys.supportedKeys.secp256k1.Secp256k1PrivateKey(
        accountFirstAddress.privateKey,
        accountFirstAddress.publicKey
      );
    let pID: PeerId = await peerID.createFromPrivKey(
      p2pCrypto.keys.marshalPrivateKey(convertedKey),
      "secp256k1"
    );

    console.log(accountFirstAddress.publicKey, pID.toString(), pID.toPrint(), pID.marshal(), pID.marshalPubKey());
    /*
    let accountKeys = mN.derivePath("m/44'/0'/0'/0/0");
    const { address } = payments.p2pkh({
      pubkey: accountKeys.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });
    btcAddress = address;
    //mN.derivePath("m/44'/0'/0'").toBase58() - Account
    let bip84Account = mN.derivePath("m/84'/0'/0'/0/0");
    const { address: swaddress } = payments.p2wpkh({
      pubkey: bip84Account.publicKey,
      network: globalThis.bitcoinjs.bitcoin,
    });
    btcSegWitAddress = swaddress;
    xpriv = mN.toBase58();
    console.log(mN.privateKey.toString("hex"));
    if ($Seed) {
      let ethNode = ethHDNode.fromSeed($Seed);
      let firstWallet = ethNode.derivePath(`m/44'/60'/0'/0/0`);
      ethAddress = firstWallet.address;
    }*/
  };

  const exportAccount = () => {};

  const importAccount = () => {};

  masterNode.subscribe(initAccount);

  xprivMasterNode.subscribe(initAccount);

  const exportKey = (e) => {
    doExport = !doExport;
  };
</script>

<div class="text-gray-800 w-full h-screen flex items-center justify-center">
  <div
    class="bg-gray-200 w-auto m-10 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center">
    <div class="text-2xl mb-10">Account Addresses</div>
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
    <div
      class:hidden={!doExport}
      class="w-full flex items-center flex-col pt-10">
      <h1 class="text-xs break-all mb-5">
        Root Key:
        {xpriv}
      </h1>
      <textarea
        readonly
        class="resize-none w-9/12 h-30 font-bold py-2 px-4 rounded mt-10"
        bind:value={$bip39Phrase} />
    </div>
  </div>
</div>
