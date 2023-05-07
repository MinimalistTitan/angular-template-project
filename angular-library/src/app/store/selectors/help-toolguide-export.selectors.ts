import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HelpToolGuideDataState } from "../reducers/help-toolguide-export.reducers";

export const HELP_TOOLGUIDE_STATE_NAME = 'helpToolGuide';
export const ACTIVE_ACCORDION = 'activeAccordion';

const getHelpToolGuideState = createFeatureSelector<HelpToolGuideDataState>(HELP_TOOLGUIDE_STATE_NAME);

export const toolGuidExportAreaHelpSelector = createSelector(getHelpToolGuideState, (state) => {
    return state.toolGuidExportAreaHelp;
});