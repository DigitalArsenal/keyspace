<script lang="ts">
  import { masterNode, xpubMasterNode } from "../stores/userprofile.store";
  import ProfilePage from "./ProfilePage.svelte";
  import UsernamePasswordPin from "./UsernamePasswordPin.svelte";
  import ImportKey from "./ImportKey.svelte";
  import { Buffer } from "buffer";
  import { push, pop, replace } from "svelte-spa-router";

  export let params: any = {};
</script>

<div class="bg-black-100 min-h-screen	flex items-center justify-center">
  {#if $masterNode || $xpubMasterNode}
    <ProfilePage />
  {:else}
    <div
      class="bg-gray-200 rounded py-16 px-8 m-16 flex flex-col items-center justify-center">
      <!-- User profile image -->
      <img
        class="rounded-full h-32 w-32"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAAAAAB3tzPbAAACOUlEQVR4Ae3aCQrrIBRG4e5/Tz+CBAlIkIAECUjoSt48z/GZeAvnrMCvc6/38XzxAAAAYC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAMCAAAAAAAAAAAAAAAAPsagz4V4rq/FmCLTj/k4vYqgCN5/TKfjlcAJKff5pJ5QPH6Y77YBiz6a4thQJ30D03VKmB3+qfcbhOwO+l+waP/+VsEBgDV6USumgNMOtVkDbDoZIstQNHpiimA1+m8JUBSQ8kO4HBqyB1mAElNJTMAr6a8FcCmxjYjgKjGohGAU2POBmBXc7sJwKrmVhOAqOaiCUBQc8EEQO0JwPMB4ADASwhAe3yR8VPiP3/M8XOaPzQd/lLyp56xSuvnUGK0yHC313idCw6umNov+bhm5aK7fdWAZQ/WbdoXnlg5Y+mvfe2SxVdWj20FAAAAAAAAAAAAwFQAAJSS0hwmfVMIc0qlmAfsOQWvP+RDyrtNQM1L0D8WllxNAWqOXifzMVcbgG3xaswv22jAFp3a6zFteYw8fQ9DM6Amr275VG8GlFmdm8uNgDzpgqZ8EyB7XZTPNwDKpAubysWAOuvi5nolYHW6PLdeBjiCbikc1wCK0025cgUg68Zyf0DUrcXegKibi30Bq25v7QnYNKCtH+BwGpA7ugFmDWnuBSgaVOkECBpU6AOoGlbtAlg1rLULIGhYoQvAaViuC0AD6wE4Xh1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA194CuqC6onikxXwAAAAASUVORK5CYII="
        alt="user avatar" />
      {#if params?.logintype === "import"}
        <ImportKey />
      {:else}
        <UsernamePasswordPin />
        <div class="border border-solid rounded-lg border-gray-400 px-3 py-1">
          OR
        </div>
        <button
          on:click={(e) => push("/userprofile/import")}
          class="w-3/6 mt-5 bg-blue-500 hover:bg-gray-600 text-white font-bold py-3">
          Import Key
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
</style>
