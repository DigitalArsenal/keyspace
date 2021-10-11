<script type="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { get } from "svelte/store";
  import { Grid, RowNode } from "ag-grid-community";
  import type { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions";
  import { CheckboxFilter } from "./CheckboxFilter";
  export { get };
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
    filter: true
  };
  let gridFitTimeout;
  const gridFit = (timeout: number = 100) => {
    clearTimeout(gridFitTimeout);
    gridFitTimeout = setTimeout(() => {
      grid.gridOptions.columnApi.autoSizeAllColumns();
      if (grid.gridOptions.api.columnController?.scrollWidth >= grid.gridOptions.api.columnController?.bodyWidth) {
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
        checkboxFilter: CheckboxFilter
      },
      defaultColDef,
      columnDefs: columnDefs ?? [
        {
          headerName: "",
          checkboxSelection: true,
          width: 50,
          filter: "checkboxFilter",
          valueFormatter: (v: any) => "",
          comparator: (valueA: any, valueB: any, nodeA: RowNode, nodeB: RowNode, isInverted: boolean) => {
            return isInverted ? nodeA.isSelected() > nodeB.isSelected() : nodeA.isSelected() < nodeB.isSelected();
          },
          //headerCheckboxSelection: true,
          field: "selected"
        },
        ...objectKeys
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
              suppressRowGroups: false
            }
          },
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel"
          }
        ],
        defaultToolPanel: ""
      }
    };
    let eGridDiv = document.getElementById(name);
    grid = new Grid(eGridDiv, gridOptions);
    gridFit(0);
  });
</script>

<svelte:head>
  <style>
    @import "../../../node_modules/@ag-grid-community/all-modules/dist/styles/ag-grid.css";
    @import "../../../node_modules/@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
    @import "../../../node_modules/@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  </style>
</svelte:head>

<div transition:fly={{ y: 200, duration: 200 }} id={name} style={cssString} class={classString} />

<style>
  ::-webkit-scrollbar {
    height: var(--scrollbar-height);
    width: var(--scrollbar-width);
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c2c2c2;
    border-radius: 10px;
    background-clip: content-box;
    height: 8vh;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #7d7d7d;
    border-radius: 10px;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:vertical,
  ::-webkit-scrollbar-thumb:vertical:hover {
    border: 3px solid transparent;
    border-left-width: 4px;
  }
  ::-webkit-scrollbar-thumb:horizontal,
  ::-webkit-scrollbar-thumb:horizontal:hover {
    border: 3px solid transparent;
    border-top: 4px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: #aaa;
  }
  ::-webkit-scrollbar-track:vertical {
    border-left: 0px solid #e8e8e8;
  }
</style>
