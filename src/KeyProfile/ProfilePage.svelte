<script lang="ts">
  import Icon from "svelte-awesome";

  import { btc, questionCircle, copy } from "svelte-awesome/icons";

  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    Seed,
    purposes,
    cointypes,
    getBIP32Path,
    Bip32Hardened,
    exBip32Path,
    addressType,
    networkObj,
  } from "../stores/keyprofile.store";
  import type { Bip32Path } from "../stores/keyprofile.store";
  import * as BlockCypherAPI from "../class/BlockCypherAPI";

  let { bip32: HDNode, networks } = globalThis.bitcoinjs;

  $: {
    if (bip32Path) {
      initAccount($masterNode);
    }
  }
  const { Hardened } = Bip32Hardened;

  let bip32Path: Bip32Path = {
    purpose: { value: 84, h: Hardened },
    cointype: { value: 0, h: Hardened },
    account: { value: 0, h: Hardened },
  };

  let activeNetwork = "btc";

  let accounts: Array<string> = ["Default"];

  let accountNode: typeof HDNode;

  let accountStatus: {
    [key: string]: BlockCypherAPI.Address;
  } = {};
  let rollupAccount: BlockCypherAPI.Address = {
    balance: 0,
    hd_wallet: null,
    total_received: 0,
    total_sent: 0,
    unconfirmed_balance: 0,
    final_balance: 0,
    n_tx: 0,
    unconfirmed_n_tx: 0,
    final_n_tx: 0,
    txs: [],
    txrefs: [],
    unconfirmed_txrefs: [],
    hasMore: false,
  };

  const getBalance = async function (btcAddress) {
    let { coin, chain } = networkObj[activeNetwork];
    let f = await fetch(
      `https://btc.digitalarsenal.io/blockexplorer?coin=${coin}&chain=${chain}&address=${btcAddress}`
    );
    return await f.json();
  };

  const initAccount = async (mN) => {
    console.log(mN);
    if (!mN) return;
    let bP = bip32Path;
    accountNode = mN.derivePath(getBIP32Path(bP));
    const { address: accountNodeAddress } = addressType[bP.purpose.value]({
      pubkey: accountNode.publicKey,
      network: networkObj[activeNetwork].network,
    });
    accountStatus[accountNodeAddress] = new BlockCypherAPI.Address();
    getBalance(accountNodeAddress).then((newStatus) => {
      accountStatus[accountNodeAddress] = newStatus;
      for (let account in accountStatus) {
        rollupAccount.balance += accountStatus[account].balance;
      }
    });
    console.log(accountNode.toBase58());
    console.log(accountNode.neutered().toBase58());
    console.log(accountNode.publicKey.toString("hex"));
    console.log(accountNodeAddress);
  };

  const exportAccount = () => {};

  [masterNode, xprivMasterNode].forEach((c) => c.subscribe(initAccount));

  let signtext = "";
  let signatureb64 = "";
  const { message } = globalThis.bitcoinjs;

  const signMessage = (e) => {
    signtext = signtext.trim();
    var signature = message.sign(
      signtext,
      accountNode.privateKey,
      accountNode.compressed
    );
    signatureb64 = signature.toString("base64");
  };
</script>

<div
  class="text-gray-800 w-full h-screen flex items-center pt-10 justify-center">
  <div
    class="text-white w-full h-full rounded-lg p-10 flex flex-col items-center">
    <!--Balance-->
    <div
      class="flex items-center align-center md:text-lg text-xs md:left-2 pl-2 pr-2">
      Trust Level (Balance)
      <Icon class="transform scale-100 ml-2" data={questionCircle} />
    </div>
    <div
      id="balance"
      class="w-1/2 flex justify-center items-center md:text-4xl text-2xl border-1 rounded-md border-gray-500 md:p-10 p-7">
      {rollupAccount.balance / 100_000_000}
      <Icon class="transform scale-125 ml-3" data={btc} />
    </div>
    <div class="flex flex-col gap-10 pt-10">
      <label class="block text-center" style="max-width: 400px">
        <span class="text-white">Account</span>
        <select class="form-select block w-full mt-1 bg-black	p-2 rounded-md">
          {#each accounts as account, a}
            <option
              >m'/{bip32Path.purpose.value}{bip32Path.purpose.h}/{bip32Path
                .cointype.value}{bip32Path.cointype.h}/{bip32Path.account
                .value}{bip32Path.account.h}:
              {accounts[bip32Path.account.value]}</option>
          {/each}
        </select>
      </label>
      {#each Object.entries(accountStatus) as btcaddress, i}
        <div
          class="text-xs flex items-center"
          on:click={(e) => {
            navigator.clipboard.writeText(btcaddress[0]);
          }}>
          {btcaddress[0]}
          <Icon data={copy} class="cursor-pointer ml-2" />
        </div>
      {/each}
      <textarea class="rounded-md h-20 p-2 text-black" bind:value={signtext} />
      <div
        class="relative -top-10"
        on:click={(e) => {
          navigator.clipboard.writeText(signtext);
        }}>
        <Icon data={copy} class="cursor-pointer ml-2" />
      </div>
      <div
        style="word-break:break-all;width:200px"
        class="text-xs flex items-center"
        on:click={(e) => {
          navigator.clipboard.writeText(signatureb64);
        }}>
        {signatureb64}
      </div>
      <div
        class="relative -top-10"
        on:click={(e) => {
          navigator.clipboard.writeText(signatureb64);
        }}>
        <Icon data={copy} class="cursor-pointer ml-2" />
      </div>
      <button
        class="border-1 rounded-md border-white p-2"
        on:click={(e) => signMessage(e)}>Sign Message</button>
    </div>
  </div>
</div>
