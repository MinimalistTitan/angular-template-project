import { createReducer, on } from '@ngrx/store';
import { GetGridRowCollapseExpandState } from '../actions/grid-row-collapse-expand-state.actions';

export interface GridRowCollapseExpandState {
  groupsRowState: { [id: string]: boolean };
}

export const initialGridRowCollapseExpandState: GridRowCollapseExpandState = {
  groupsRowState: null,
};

const _gridRowCollapseExpandStateReducer = createReducer(
  initialGridRowCollapseExpandState,
  on(GetGridRowCollapseExpandState, (state, { payload }) => {
    return {
      ...state,
      groupsRowState: updateState(state, payload),
    };
  })
);

export function gridRowCollapseExpandStateReducer(state, action) {
  return _gridRowCollapseExpandStateReducer(state, action);
}

export function updateState(
  state: GridRowCollapseExpandState,
  payload: { [id: string]: boolean }
) {
  let currentState = { ...state.groupsRowState };
  Object.keys(payload).forEach((key) => {
    currentState[key] = payload[key];
  });

  return {...currentState };
}