<script lang="ts">
  //@ts-nocheck
  import { push } from "svelte-spa-router";
  import { upload } from "svelte-awesome/icons";
  import Icon from "svelte-awesome";
  import Dropzone from "svelte-file-dropzone";
  const HDNode = globalThis.bitcoinjs.bip32;
  const { mnemonicToSeedSync } = globalThis.bitcoinjs.bip39;

  import { masterNode, privateKey } from "../stores/userprofile.store";

  let _pkBuffer;
  let _masterNode;
  let fileinput;
  async function handleFilesSelect(e) {
    let files = {
      accepted: [],
      rejected: []
    };
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    let reader = new FileReader();
    reader.readAsArrayBuffer(files.accepted[0]);
    reader.onload = ({ currentTarget: { result } }) => {
      readFile(result);
    };
  }

  const onFileSelected = (value) => {
    let encoder = new TextEncoder();
    readFile(encoder.encode(value).buffer);
  };

  const readFile = async (FileBuffer: ArrayBuffer) => {
    fileinput = FileBuffer;
    let textInput = new TextDecoder().decode(FileBuffer);
    if (textInput.split(/\s/g).length >= 12) {
      textInput = textInput.replace(/\s/g, " ");
      _pkBuffer = mnemonicToSeedSync(textInput);
      $privateKey = _pkBuffer;
      _masterNode = HDNode.fromSeed(_pkBuffer);
      /**
       * BIP 44: m/44'/0'/0' (1xxx...) //19Skn7F9PV4DyumBA5CG8uwAVF98S6ebi1
       * BIP 49: m/49'/0'/0' (3xxx...)
       * BIP 84: m/84'/0'/0' (bc1xxx...)
       */
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    $masterNode = _masterNode;
  };
</script>

<form on:submit={handleOnSubmit} method="post" class="w-5/6 mt-8 mb-4 flex flex-col gap-4 align-center items-center">
  <span class="text-gray-700 w-full flex align-center justify-between"><span class="flex items-center text-gray-400">Paste Key </span> </span>
  <textarea class="-mt-2 w-full h-20" on:input={({ target: { value } }) => onFileSelected(value)} />
  <Dropzone containerClasses={["w-full"]} on:drop={handleFilesSelect} />

  <button class="w-full {fileinput ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-gray-600 text-white font-bold  py-3" type="submit">Import</button>
  <button on:click={(e) => push("/userprofile")} class="w-4/6 mt-5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3">Back</button>
</form>
