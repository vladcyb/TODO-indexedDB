import { RootState } from '../index';

export const getAppState = (state: RootState) => state.app.state;
export const getAppLoading = (state: RootState) => state.app.loading;
