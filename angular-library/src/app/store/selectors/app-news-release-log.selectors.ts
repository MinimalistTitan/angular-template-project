import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppNewsReleaseLogDataState, AppVersionState } from "../reducers/app-news-release-log.reducer";

export const APP_NEWS_RELEASE_LOG_STATE_NAME = 'appNewsReleaseLog';
export const APP_VERSION_STATE_NAME = 'appVersion';

const getAppNewsReleaseLogState = createFeatureSelector<AppNewsReleaseLogDataState>(APP_NEWS_RELEASE_LOG_STATE_NAME);
const getVersionState = createFeatureSelector<AppVersionState>(APP_VERSION_STATE_NAME);

export const appNewsReleaseLogSelector = createSelector(getAppNewsReleaseLogState, (state) => {
    return state.appNewsReleaseLog;
});

export const appVersionSelector = createSelector(getVersionState, (state) => {
    return state.appVersion;
});