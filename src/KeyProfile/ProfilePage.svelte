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
  } from "../stores/keyprofile.store";
  import type { Bip32Path, Bip32Hardened } from "../stores/keyprofile.store";

  let { payments, bip32: HDNode, networks } = globalThis.bitcoinjs;

  $: {
    if (bip32Path) {
      initAccount($masterNode);
    }
  }

  let bip32Path: Bip32Path = {
    purpose: { value: 84, h: "'" as Bip32Hardened },
    cointype: { value: 0, h: "'" as Bip32Hardened },
    account: { value: 0, h: "'" as Bip32Hardened },
  };

  let networkObj = {
    "btc-testnet": {
      network: networks.testnet,
      coin: "btc",
      chain: "test3",
    },
    btc: {
      network: networks.bitcoin,
      coin: "btc",
      chain: "main",
    },
  };
  let activeNetwork = "btc";

  let accounts: Array<string> = ["Default"];
  interface AccountStatusArray {
    [key: string]: BlockCypherAPI.Address;
  }

  let accountNode: typeof HDNode;

  let accountStatus: AccountStatusArray = {};
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
  const { p2pkh, p2wpkh, p2sh, p2wsh, p2pk } = payments;

  const initAccount = async (mN) => {
    if (!mN) return;
    accountNode = mN.derivePath(getBIP32Path(bip32Path));

    let tType = {
      44: p2pkh,
      49: ({ pubkey, network }) => {
        return p2sh({
          redeem: p2wsh({
            redeem: p2pk({
              pubkey,
              network,
            }),
            network,
          }),
        });
      },
      84: p2wpkh,
    };

    const { address: accountNodeAddress } = tType[bip32Path.purpose.value]({
      pubkey: accountNode.publicKey,
      network: networkObj[activeNetwork].network,
    });
    accountStatus[accountNodeAddress] = await getBalance(accountNodeAddress);
    rollupAccount.balance = 0;
    for (let account in accountStatus) {
      rollupAccount.balance += accountStatus[account].balance;
    }
    /*
    console.log(accountNode.toBase58());
    console.log(accountNode.neutered().toBase58());
    console.log(accountNode.publicKey.toString("hex"));
    console.log(accountNodeAddress);
    */
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
