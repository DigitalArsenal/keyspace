<script lang="ts">
  import Icon from "svelte-awesome";

  import { btc, questionCircle } from "svelte-awesome/icons";

  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    Seed,
  } from "../stores/keyprofile.store";
  let { payments, bip32: HDNode, networks } = globalThis.bitcoinjs;

  let purposes = [44, 49, 84];
  let cointypes = [0 /*BTC*/];
  let bip32Path = {
    purpose: { value: purposes[0], h: "'" },
    cointype: { value: cointypes[0], h: "'" },
    account: { value: 0, h: "'" },
    change: { value: 0, h: "" },
    address_index: { value: 0, h: "" },
  };

  let network = networks.bitcoin;
  let accounts: Array<string> = ["Default"];
  interface AccountStatusArray {
    [key: string]: BlockCypherAPI.Address;
  }

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
    let f = await fetch(
      `https://btc.digitalarsenal.io/blockexplorer?chain=btc&address=${btcAddress}`
    );
    return await f.json();
  };

  const { mnemonicToSeedSync } = globalThis.bitcoinjs.bip39;
  const { message } = globalThis.bitcoinjs;

  const initAccount = async (mN) => {
    if (!mN) return;
    let btcAddress = "1o1oiXfMHPXMY6kxeZfXSHsYKWp9DqtU7";
    accountStatus[btcAddress] = await getBalance(btcAddress);
    rollupAccount.balance = 0;
    for (let account in accountStatus) {
      rollupAccount.balance += accountStatus[account].balance;
    }
  };

  const exportAccount = () => {};
  [masterNode, xprivMasterNode].forEach((c) => c.subscribe(initAccount));
</script>

<div
  class="text-gray-800 w-full h-screen flex items-center pt-10 justify-center">
  <div
    class="text-white w-full h-full rounded-lg p-10 flex flex-col items-center">
    <!--Balance-->
    <div
      id="balance"
      class="relative flex justify-center items-center md:text-4xl text-2xl border-1 rounded-md border-gray-500 md:p-10 p-7">
      <div
        class="flex items-center align-center md:text-lg text-xs absolute md:-top-7 -top-5 md:left-2 pl-2 pr-2">
        Trust Level (Balance)
        <Icon class="transform scale-100 ml-2" data={questionCircle} />
      </div>
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
                {accounts[
                bip32Path.account.value
              ]}</option>
          {/each}
        </select>
      </label>
      {#each Object.entries(accountStatus) as btcaddress, i}
        <div class="text-xs">{btcaddress[0]}</div>
      {/each}
    </div>
  </div>
</div>
