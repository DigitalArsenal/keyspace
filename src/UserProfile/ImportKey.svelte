<script lang="ts">
  import { push } from "svelte-spa-router";
  import { upload } from "svelte-awesome/icons";
  import Icon from "svelte-awesome";
  import Dropzone from "svelte-file-dropzone";

  export let pkBuffer,
    fileinput,
    files = {
      accepted: [],
      rejected: []
    };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

  const onFileSelected = (e) => {
    console.log(fileinput);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
  };
</script>

<form on:submit={handleOnSubmit} method="post" class="w-5/6 mt-8 mb-4 flex flex-col gap-4 align-center items-center">
  <span class="text-gray-700 w-full flex align-center justify-between"><span class="flex items-center text-gray-400">Paste Key </span> </span>
  <textarea class="-mt-2 w-full h-40 mt-" />
  <Dropzone containerClasses={["w-full"]} on:drop={handleFilesSelect} />

  <button class="w-3/6 {fileinput ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-gray-600 text-white font-bold  py-3" type="submit">Import</button>
  <button on:click={(e) => push("/userprofile")} class="w-2/6 mt-5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3">Back</button>
</form>
