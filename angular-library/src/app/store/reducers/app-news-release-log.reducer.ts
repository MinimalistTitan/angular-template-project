import { createReducer, on } from '@ngrx/store';
import { GetAppNewsReleaseLogData, GetAppNewsReleaseLogDataSuccess, GetAppVersionData, GetAppVersionSuccess } from '../actions/app-news-release-log.actions';

export class AppNewsViewModel
{
    appNewsHtmlContent:string
    releaseLogHtmlContent:string
}

export interface AppNewsReleaseLogDataState {
    appNewsReleaseLog: AppNewsViewModel
}

export interface AppVersionState {
    appVersion: string
}

export const initialAppNewsReleaseLogDataState: AppNewsReleaseLogDataState = {
    appNewsReleaseLog: null
}

export const initialAppVersionState: AppVersionState = {
    appVersion: null
}

const _appNewsReleaseLogReducer = createReducer(
    initialAppNewsReleaseLogDataState,
    on(GetAppNewsReleaseLogData, (state) => {
        return {
            ...state
        }
    }),

    on(GetAppNewsReleaseLogDataSuccess, (_state, { data }) =>
        ({ ..._state, appNewsReleaseLog: data })
    )
);

const _appVersionReducer = createReducer(
    initialAppVersionState,
    on(GetAppVersionData, (state) => {
        return {
            ...state
        }
    }),

    on(GetAppVersionSuccess, (_state, { data }) =>
        ({ ..._state, appVersion: data})
    )
);

export function appNewsReleaseLogReducer(state, action) {
    return _appNewsReleaseLogReducer(state, action);
}

export function appVersionReducer(state, action) {
    return _appVersionReducer(state, action);
}

