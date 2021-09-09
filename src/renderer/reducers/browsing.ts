import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBrowsingState } from '../types/reducers';
import { initialTab } from '../constants/browsing';
import { loadPhishingSiteCheck } from '../actions/browsing';

const initialState: IBrowsingState = {
  tabs: [initialTab()],
  currentTab: '',
  isPhishingSite: false,
  loadPhishingSiteCheckDone: false,
  loadPhishingSiteCheckLoading: false,
  loadPhishingSiteCheckError: null,
};

export const browsingSlice = createSlice({
  name: 'browsing',
  initialState,
  reducers: {
    initialize: (state) => {
      state.currentTab = state.tabs[0].id;
    },
    moveTab: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.currentTab = payload.id;
    },
    addTab: (state) => {
      const newTab = initialTab();
      state.tabs = [...state.tabs, newTab];
      state.currentTab = newTab.id;
    },
    removeTab: (state, { payload }: PayloadAction<{ id: string }>) => {
      const tabs = state.tabs.filter(({ id }) => id !== payload.id);
      state.tabs = tabs;
      if (payload.id === state.currentTab) {
        state.currentTab = tabs[tabs.length - 1].id;
      }
    },
    updateTab: (
      state,
      {
        payload: { id: tabId, ...data },
      }: PayloadAction<{
        id: string;
        url?: string;
        favicon?: string;
        title?: string;
      }>
    ) => {
      const newTabs = state.tabs;
      state.tabs.forEach(({ id, ...tab }, i): boolean => {
        if (id !== tabId) return true;
        newTabs[i] = { id, ...tab, ...data };
        return false;
      });
      state.tabs = newTabs;
    },
    addUrl: (
      state,
      {
        payload: { id: tabId, url },
      }: PayloadAction<{ id?: string; url: string }>
    ) => {
      const newTabs = state.tabs;
      state.tabs.forEach(({ id, point, stack, ...tab }, i): boolean => {
        if (tabId !== id || url === stack[0]) return true;
        if (url === stack[0]) return true;
        newTabs[i] = {
          ...tab,
          id,
          url,
          point: 0,
          stack: [url, ...stack.slice(point)],
        };
        return false;
      });
      state.tabs = newTabs;
    },
    moveSpace: (
      state,
      { payload: { mode } }: PayloadAction<{ mode: 'back' | 'forward' }>
    ) => {
      const newTabs = state.tabs;
      state.tabs.forEach(({ id, point, ...tab }, i): boolean => {
        if (id !== state.currentTab) return true;
        if (
          (mode === 'forward' && point > 0) ||
          (mode === 'back' && point + 1 < tab.stack.length)
        ) {
          newTabs[i] = {
            id,
            ...tab,
            point: point + (mode === 'back' ? 1 : -1),
          };
        } else console.log('pause');
        return false;
      });
      state.tabs = newTabs;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadPhishingSiteCheck.pending, (state) => {
        state.loadPhishingSiteCheckDone = false;
        state.loadPhishingSiteCheckLoading = true;
        state.loadPhishingSiteCheckError = null;
      })
      .addCase(
        loadPhishingSiteCheck.fulfilled,
        (state, { payload }: PayloadAction<boolean>) => {
          state.loadPhishingSiteCheckDone = true;
          state.loadPhishingSiteCheckLoading = false;
          state.isPhishingSite = payload;
        }
      )
      .addCase(loadPhishingSiteCheck.rejected, (state, { payload }) => {
        state.loadPhishingSiteCheckLoading = false;
        state.loadPhishingSiteCheckError = payload;
      }),
});

export default browsingSlice.reducer;
