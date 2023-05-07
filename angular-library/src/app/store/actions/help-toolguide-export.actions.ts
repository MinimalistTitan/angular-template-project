import { createAction, props } from "@ngrx/store";
import { ProductHierarchyTypeEnum } from "src/app/models/enums";
import { HelpToolGuideResponseModel } from "../reducers/help-toolguide-export.reducers";

export const LOAD_HELP_TOOL_GUIDE_DATA = '[Capacity Data Component] Load Help Tool Guide Data';
export const LOAD_HELP_TOOL_GUIDE_DATA_SUCCESS = '[Capacity Data Component] Load Help Tool Guide Data Success';
export const LOAD_HELP_TOOL_GUIDE_DATA_FAILED = '[Capacity Data Component] Load Help Tool Guide Data Error';
export const SET_CURRENT_ACTIVE_ACCORDION = '[Capacity Data Component] Set Current Active Accordion';

export const SetCurrentActiveAccordion = createAction(SET_CURRENT_ACTIVE_ACCORDION, props<{ status: string }>());
export const GetHelpToolGuideData = createAction(LOAD_HELP_TOOL_GUIDE_DATA, props<{ hierarchyType: ProductHierarchyTypeEnum }>());
export const LoadHelpToolGuideDataSuccess = createAction(LOAD_HELP_TOOL_GUIDE_DATA_SUCCESS,
    props<{ hierarchyType: ProductHierarchyTypeEnum, data: HelpToolGuideResponseModel }>());
export const LoadHelpToolGuideDataFailed = createAction(LOAD_HELP_TOOL_GUIDE_DATA_FAILED,
    props<any>());




