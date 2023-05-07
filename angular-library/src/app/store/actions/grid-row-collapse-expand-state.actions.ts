import { createAction, props } from '@ngrx/store';

export const GET_GRID_ROW_STATE = '[GET]Grid row state';
export const GetGridRowCollapseExpandState = createAction(GET_GRID_ROW_STATE, props<{payload: { [id: string]: boolean; }}>());