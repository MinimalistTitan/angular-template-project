import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GridRowCollapseExpandState } from "../reducers/grid-row-collapse-expand-state.reducer";

export const GRID_ROW_STATE_NAME = 'gridRowState';
const getGridRowCollapseExpandState = createFeatureSelector<GridRowCollapseExpandState>(GRID_ROW_STATE_NAME);
export const gridRowCollapeExpandStateSelector = createSelector(getGridRowCollapseExpandState, (state) => {
    return state;
});