import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

export interface IBannerState {
  name: string;
  closedAt: number;
}

export type TBannersSlice = {
  closed: IBannerState[];
};

const initialState: TBannersSlice = {
  closed: [],
};

export const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    closeBanner: (state, action: PayloadAction<IBannerState>) => {
      state.closed = [...state.closed, action.payload];
    },

    setClosedBanners: (state, action: PayloadAction<IBannerState[]>) => {
      state.closed = action.payload;
    },
  },
});

const selectBanners = (state: { banners: TBannersSlice }) => state.banners;

export const selectClosedBannersState = createSelector(
  selectBanners,
  state => state.closed,
);

export const { closeBanner, setClosedBanners } = bannersSlice.actions;
