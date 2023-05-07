import { createReducer, on } from '@ngrx/store';
import * as helpToolGuideAction from "../actions/help-toolguide-export.actions";
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';

export class HelpToolGuideResponseModel {
    documentHtmlContent: string = '';
    exportInfoHtmlContent: string = '';
}

export interface HelpToolGuideDataState {
    toolGuidExportAreaHelp: { [id: string]: HelpToolGuideResponseModel; }
}

export const initialHelpToolGuideDataState: HelpToolGuideDataState = {
    toolGuidExportAreaHelp: null
}

const _helpToolGuideReducer = createReducer(
    initialHelpToolGuideDataState,
    on(helpToolGuideAction.GetHelpToolGuideData, (state) => {
        return {
            ...state
        }
    }),

    on(helpToolGuideAction.LoadHelpToolGuideDataSuccess, (_state, { hierarchyType: hierarchyType, data }) =>
        ({ ..._state, toolGuidExportAreaHelp: toToolGuideState(_state, hierarchyType, data) })
    )
);

export function helpToolGuideReducer(state, action) {
    return _helpToolGuideReducer(state, action);
}

function toToolGuideState(_state: HelpToolGuideDataState, hierarchyType: ProductHierarchyTypeEnum, data: HelpToolGuideResponseModel) {
    const toolGuidExportAreaHelp = { ..._state.toolGuidExportAreaHelp };
    toolGuidExportAreaHelp[hierarchyType.toString()] = {
        documentHtmlContent: data.documentHtmlContent,
        exportInfoHtmlContent: data.exportInfoHtmlContent
    } as HelpToolGuideResponseModel;
    return toolGuidExportAreaHelp;
}

