import type { IFilterComp, IFilterParams, IDoesFilterPassParams } from "@ag-grid-community/all-modules/";

class ShowChecked {
    selected: boolean;
    notSelected: boolean;
}

class CheckboxFilter implements IFilterComp {
    valueGetter;
    showChecked: ShowChecked;
    gui;
    selectBoxes;
    eFilterText;
    init(params: IFilterParams) {
        this.valueGetter = params.valueGetter;
        this.showChecked = { selected: true, notSelected: true };
        this.setupGui(params);
    }

    // not called by AG Grid, just for us to help setup
    setupGui(params: IFilterParams) {
        this.gui = document.createElement('div');
        this.gui.innerHTML = `
        <style>
        .optionclass{
            justify-content: flex-start;
            display: flex;
            align-items: center;
        }
        .optionclass input{
            margin:4px;
        }
        </style>
        <div style="padding: 4px; width: 100px;">
        <div style="font-weight: bold;margin-bottom:10px"> Selected Filter </div>
        <div style="display:grid">
            <div class="optionclass">
                <input type="checkbox"
                       id="selected"
                       checked="checked" />Selected
            </div>
            <div class="optionclass">
                <input type="checkbox"
                       id="notSelected"
                       checked="checked" />Unselected
            </div>
        </div>
    </div>`;

        const listener = (event: Event) => {
            let { checked, id } = (event.target as HTMLInputElement);
            this.showChecked[id] = checked;
            console.log(this.showChecked);
            params.filterChangedCallback();
        };

        this.selectBoxes = [
            this.gui.querySelector('#selected'),
            this.gui.querySelector('#notSelected')
        ];
        for (let s = 0; s < this.selectBoxes.length; s++) {
            this.selectBoxes[s].addEventListener('change', listener);
        }
    }

    getGui() {
        return this.gui;
    }

    doesFilterPass({ node, data }: IDoesFilterPassParams) {
        const nodeSelected: boolean = node.isSelected();
        return this.showChecked.selected && nodeSelected || this.showChecked.notSelected && !nodeSelected || this.showChecked.selected && this.showChecked.notSelected;
    }

    isFilterActive() {
        return true;
    }

    getModel() {
        return this.showChecked;
    }

    setModel(model) {
        this.eFilterText.value = model.value;
    }
}

export { CheckboxFilter };