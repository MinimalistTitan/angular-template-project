
import { createAction, props } from "@ngrx/store";
import { AppNewsViewModel } from "../reducers/app-news-release-log.reducer";

export const LOAD_APP_NEWS_RELEASE_LOG_DATA = '[App News And Release Log] Load Help Tool Guide Data';
export const LOAD_APP_NEWS_RELEASE_LOG_DATA_SUCCESS = '[App News And Release Log] Load App News And Release Log Data success';
export const LOAD_APP_NEWS_RELEASE_LOG_DATA_FAILED = '[App News And Release Log] Load App News And Release Log Data failed';
export const LOAD_APP_VERSION = '[App News And Release Log] App Version';
export const LOAD_APP_VERSION_SUCCESS = '[App News And Release Log] App Version Success';
export const LOAD_APP_VERSION_FAILED = '[App News And Release Log] App Version Success';

export const GetAppNewsReleaseLogData = createAction(LOAD_APP_NEWS_RELEASE_LOG_DATA);
export const GetAppVersionData = createAction(LOAD_APP_VERSION);
export const GetAppNewsReleaseLogDataSuccess = createAction(LOAD_APP_NEWS_RELEASE_LOG_DATA_SUCCESS,
    props<{ data: AppNewsViewModel }>());
export const GetAppVersionSuccess = createAction(LOAD_APP_VERSION_SUCCESS,
    props<{ data: string }>());

export const GetAppNewsReleaseLogDataFailed = createAction(LOAD_APP_NEWS_RELEASE_LOG_DATA_FAILED,
    props<any>());

export const GetAppVersionFailed = createAction(LOAD_APP_VERSION_FAILED,
    props<any>());




