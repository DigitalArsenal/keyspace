<script lang="ts">
  //@ts-nocheck
  import { push } from "svelte-spa-router";
  import Dropzone from "svelte-file-dropzone";
  const HDNode = globalThis.bitcoinjs.bip32;
  const XPUBHDnode = globalThis.bitcoinjs.bip32;
  const { mnemonicToSeedSync, entropyToMnemonic } = globalThis.bitcoinjs.bip39;
  const { payments, networks } = globalThis.bitcoinjs;
  //https://github.com/trezor/python-mnemonic/blob/master/vectors.json
  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    Seed,
    bip39Phrase,
  } from "../stores/userprofile.store";

  let _pkBuffer,
    _masterNode,
    _xpubMasterNode,
    _xprivMasterNode,
    tab = 0,
    tboxValue,
    wordLengths = [12, 15, 18, 21, 24],
    wordLength = 12;

  async function handleFilesSelect(e) {
    let files = {
      accepted: [],
      rejected: [],
    };
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    let reader = new FileReader();
    reader.readAsArrayBuffer(files.accepted[0]);
    reader.onload = ({ currentTarget: { result } }) => {
      readFile(result);
      handleOnSubmit();
    };
  }

  //TODO hex, binary, mnemonic password
  const readFile = async (FileBuffer: ArrayBuffer | string) => {
    let textInput;
    if (typeof FileBuffer === "string") {
      textInput = FileBuffer;
    } else {
      textInput = new TextDecoder().decode(FileBuffer);
    }

    if (textInput.split(/\s/g).length >= 12) {
      textInput = textInput.replace(/\s/g, " ");
      bip39Phrase.set(textInput);
      _pkBuffer = mnemonicToSeedSync(textInput);
      _masterNode = HDNode.fromSeed(_pkBuffer);
    } else if (textInput.match(/^xpub/)) {
      _xpubMasterNode = HDNode.fromBase58(textInput, networks.bitcoin);
    } else if (textInput.match(/^xprv/)) {
      _xprivMasterNode = HDNode.fromBase58(textInput);
    }
  };

  const generateWords = async (e) => {
    e.preventDefault();
    let wBuffer = new Uint8Array(((wordLength / 3) * 32) / 8);
    var data = crypto.getRandomValues(wBuffer);
    let words = entropyToMnemonic(data);
    await readFile(words);
    handleOnSubmit();
  };
  const handleOnSubmit = async (e) => {
    e?.preventDefault();
    $masterNode = _masterNode;
    $xpubMasterNode = _xpubMasterNode;
    $xprivMasterNode = _xprivMasterNode;
    $Seed = _pkBuffer;
    push("/userprofile");
  };
</script>

<label for="" class="fixed top-1 right-1 font-light text-4xl">
  key<span class="font-bold">space</span></label>
<form on:submit={handleOnSubmit} method="post">
  <div
    class="text-gray-800 w-full h-screen grid gridMain items-center justify-center">
    <div class="self-end">
      <ul
        class="max-w-screen-sm grid grid-cols-2 gap-x-4 items-center justify-center text-2xl">
        <li>
          <button
            on:click={(e) => {
              e.preventDefault();
              tab = 0;
            }}
            class:bg-gray-900={tab}
            class:hover:bg-green-900={tab}
            class:bg-green-700={!tab}
            class="sbutton">IMPORT</button>
        </li>
        <li>
          <button
            on:click={(e) => {
              e.preventDefault();
              tab = 1;
            }}
            class:bg-gray-900={!tab}
            class:hover:bg-green-900={!tab}
            class:bg-green-700={tab}
            class="sbutton">GENERATE</button>
        </li>
      </ul>
    </div>
    <div class="w-full h-full flex justify-center p-1">
      <div
        style="width:70vw"
        class="self-center max-w-screen-sm bg-gray-200 h-auto rounded-lg grid gap-y-4 p-12 items-center justify-center">
        {#if !tab}
          <div class="relative w-96">
            {#if !tboxValue?.length}
              <p
                class="pointer-events-none absolute w-full h-full flex items-center text-gray-400 justify-center">
                Enter Seed Phrase Here
              </p>
            {/if}
            <textarea
              bind:value={tboxValue}
              class="w-full h-40 rounded-lg text-center p-5"
              on:input={({ target: { value } }) => readFile(value)} />
          </div>
          <div class=" text-center">OR</div>
          <Dropzone
            containerClasses={["w-full rounded-lg cursor-pointer"]}
            on:drop={handleFilesSelect} />
          <button
            type="submit"
            class="w-full h-12 rounded-lg bg-blue-600 text-gray-200 uppercase font-semibold hover:bg-blue-700 text-gray-100 transition"
            >Import</button>
        {:else}
          <div
            style="width:70vw"
            class="self-top p-12 flex flex-col items-center gap-y-16 relative max-w-screen-sm">
            <h2 class="text-2xl">WORD LENGTH</h2>
            <div class="flex flex-row gap-x-4">
              {#each wordLengths as wL, w}
                <button
                  on:click={(e) => {
                    e.preventDefault();
                    wordLength = wL;
                  }}
                  class:bg-yellow-600={wordLength === wL}
                  class="bg-gray-500 text-white flex align-center p-2 rounded-sm"
                  >{wL}</button>
              {/each}
            </div>
            <button
              on:click={generateWords}
              class="w-full h-12 rounded-lg bg-blue-600 text-gray-200 uppercase font-semibold hover:bg-blue-700 text-gray-100 transition "
              >Generate</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</form>

<style type="text/css">
  .gridMain {
    grid-template-rows: 1fr 3fr;
  }
  .sbutton {
    @apply w-full text-gray-200 rounded-lg p-4;
  }
</style>
