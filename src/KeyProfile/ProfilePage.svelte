<script lang="ts">
  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    Seed,
  } from "../stores/keyprofile.store";
  let { payments, bip32: HDNode } = globalThis.bitcoinjs;

  let addresses = {
    "44": null,
    "49": null,
    "84": null,
  };

  let account: Number = 0;

  
  const getBalance = function (btcAddress) {
    fetch(
      `https://btc.digitalarsenal.io/blockexplorer?chain=btc&address=${btcAddress}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  /**
   *   m’ / purpose’ / coin_type’ / account’ / change / address_index
   *
   */
  const { mnemonicToSeedSync } = globalThis.bitcoinjs.bip39;
  const { message } = globalThis.bitcoinjs;
  let downloadKey;
  const initAccount = async (mN) => {
    if (!mN) return;
    getBalance("1o1oiXfMHPXMY6kxeZfXSHsYKWp9DqtU7");
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

    console.log(
      accountFirstAddress.publicKey,
      pID.toString(),
      pID.toPrint(),
      pID.marshal(),
      pID.marshalPubKey()
    );
  };

  const exportAccount = () => {};
  [masterNode, xprivMasterNode].forEach((c) => c.subscribe(initAccount));
</script>

<div
  class="text-gray-800 w-full h-screen flex items-center p-20 justify-center">
  <div
    class="bg-gray-200 w-full h-full rounded-lg p-10 flex flex-col items-center">
    <h1>Test</h1>
  </div>
</div>
