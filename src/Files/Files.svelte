<script lang="ts">
  //@ts-nocheck
  import { push } from "svelte-spa-router";
  import Dropzone from "svelte-file-dropzone";
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { get } from "svelte/store";
  import { Grid, RowNode } from "ag-grid-community";
  import type { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions";
  import { CheckboxFilter } from "./CheckboxFilter";
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-balham.css";
  import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

  export let data = [{}];
  export let name = "new-table";
  export let cssString;
  export let classStringOptions = ["ag-theme-balham", "ag-theme-balham-dark"];
  export let classString = classStringOptions[1];
  export let grid;
  export let columnDefs = null;
  export let pagination = true;
  export let paginationPageSize = 10;
  export let defaultColDef = {
    sortable: true,
    filter: true,
  };
  let gridFitTimeout;
  const gridFit = (timeout: number = 100) => {
    clearTimeout(gridFitTimeout);
    gridFitTimeout = setTimeout(() => {
      grid.gridOptions.columnApi.autoSizeAllColumns();
      if (
        grid.gridOptions.api.columnController?.scrollWidth >=
        grid.gridOptions.api.columnController?.bodyWidth
      ) {
        grid.gridOptions.api.sizeColumnsToFit();
      }
    }, 100);
  };
  onMount(async () => {
    let objectKeys = Object.keys(data[0]).map((r) => {
      return { headerName: r.charAt(0).toUpperCase() + r.slice(1), field: r };
    }) as GridOptions["columnDefs"];
    const gridOptions: GridOptions = {
      onToolPanelVisibleChanged: () => gridFit(),
      onGridSizeChanged: () => {
        gridFit();
      },
      onDisplayedColumnsChanged: () => gridFit(),
      onColumnVisible: () => gridFit(),
      onColumnEverythingChanged: () => {
        gridFit();
      },
      onFilterChanged: function (...args) {
        //visSync();
      },
      onFilterModified: function () {
        //visSync();
      },
      onSelectionChanged: function (args) {
        //console.log(args.api.getSelectedNodes());
      },
      onRowSelected: function ({ ...args }) {
        // console.log("rowSelected", args);
      },
      pagination,
      paginationPageSize,
      rowSelection: "multiple",
      components: {
        checkboxFilter: CheckboxFilter,
      },
      defaultColDef,
      columnDefs: columnDefs ?? [
        {
          headerName: "",
          checkboxSelection: true,
          width: 50,
          filter: "checkboxFilter",
          valueFormatter: (v: any) => "",
          comparator: (
            valueA: any,
            valueB: any,
            nodeA: RowNode,
            nodeB: RowNode,
            isInverted: boolean
          ) => {
            return isInverted
              ? nodeA.isSelected() > nodeB.isSelected()
              : nodeA.isSelected() < nodeB.isSelected();
          },
          //headerCheckboxSelection: true,
          field: "selected",
        },
        ...objectKeys,
      ],
      rowData: data,
      sideBar: {
        position: "left",
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressRowGroups: false,
            },
          },
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
        ],
        defaultToolPanel: "",
      },
    };
    let eGridDiv = document.getElementById(name);
    grid = new Grid(eGridDiv, gridOptions);
    gridFit(0);
  });
  let tboxValue, tab;
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
  };

  const handleOnSubmit = async (e) => {
    e?.preventDefault();
  };
</script>

<div
  transition:fly={{ y: 200, duration: 200 }}
  id={name}
  style={cssString}
  class={classString} />

<!-- 
<label for="" class="fixed top-1 right-1 font-light text-4xl">
key<span class="font-bold">space</span></label>
<form on:submit={handleOnSubmit} method="post">
  <div
    class="text-gray-800 w-full h-screen grid gridMain gap-y-4 items-center justify-center">
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
        class="self-start items-center justify-center self-align max-w-screen-sm bg-gray-200 h-auto rounded-lg grid gap-y-4 p-12 ">
        {#if !tab}
          <div class="relative">
            {#if !tboxValue?.length}
              <p
                class="pointer-events-none absolute w-full h-full flex items-center text-gray-400 justify-center">
                Enter Seed Phrase Here
              </p>
            {/if}
            <textarea
              on:keypress={(event) => {
                if (
                  event.which === 13 ||
                  event.keyCode === 13 ||
                  event.key === "Enter"
                )
                  event.stopPropagation();
              }}
              bind:value={tboxValue}
              class="w-full h-40 rounded-lg text-center p-5"
              on:input={({ target: { value } }) => readFile(value)} />
          </div>
          <div class=" text-center">OR</div>
          <Dropzone
            containerClasses={["w-full rounded-lg cursor-pointer w-full"]}
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
-->
<style type="text/css">
  .gridMain {
    grid-template-rows: 1fr 3fr;
  }
  .sbutton {
    @apply w-full text-gray-200 rounded-lg p-4;
  }
</style>
