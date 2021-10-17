<script lang="ts">
  //@ts-nocheck
  import { push } from "svelte-spa-router";
  import { upload } from "svelte-awesome/icons";
  import Icon from "svelte-awesome";
  import Dropzone from "svelte-file-dropzone";
  const { mnemonicToEntropy } = globalThis.bitcoinjs.bip39;

  export let pkBuffer;

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

  const readFile = (FileBuffer: ArrayBuffer) => {
    fileinput = FileBuffer;
    let textInput = new TextDecoder().decode(FileBuffer);
    if (textInput.split(/\s/g).length >= 12) {
      console.log(textInput.replace(/\s/g, " "));
      let bip39Entropy = mnemonicToEntropy(textInput.replace(/\s/g, " "));
      console.log(bip39Entropy);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  };
</script>

<form on:submit={handleOnSubmit} method="post" class="w-5/6 mt-8 mb-4 flex flex-col gap-4 align-center items-center">
  <span class="text-gray-700 w-full flex align-center justify-between"><span class="flex items-center text-gray-400">Paste Key </span> </span>
  <textarea class="-mt-2 w-full h-20" on:input={({ target: { value } }) => onFileSelected(value)} />
  <Dropzone containerClasses={["w-full"]} on:drop={handleFilesSelect} />

  <button class="w-full {fileinput ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-gray-600 text-white font-bold  py-3" type="submit">Import</button>
  <button on:click={(e) => push("/userprofile")} class="w-4/6 mt-5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3">Back</button>
</form>
