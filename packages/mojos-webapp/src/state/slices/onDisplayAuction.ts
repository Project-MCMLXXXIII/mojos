import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnDisplayAuctionState {
  lastAuctionMojoId: number | undefined;
  onDisplayAuctionMojoId: number | undefined;
}

const initialState: OnDisplayAuctionState = {
  lastAuctionMojoId: undefined,
  onDisplayAuctionMojoId: undefined,
};

const onDisplayAuction = createSlice({
  name: 'onDisplayAuction',
  initialState: initialState,
  reducers: {
    setLastAuctionMojoId: (state, action: PayloadAction<number>) => {
      state.lastAuctionMojoId = action.payload;
    },
    setOnDisplayAuctionMojoId: (state, action: PayloadAction<number>) => {
      state.onDisplayAuctionMojoId = action.payload;
    },
    setPrevOnDisplayAuctionMojoId: state => {
      if (!state.onDisplayAuctionMojoId) return;
      if (state.onDisplayAuctionMojoId === 0) return;
      state.onDisplayAuctionMojoId = state.onDisplayAuctionMojoId - 1;
    },
    setNextOnDisplayAuctionMojoId: state => {
      if (state.onDisplayAuctionMojoId === undefined) return;
      if (state.lastAuctionMojoId === state.onDisplayAuctionMojoId) return;
      state.onDisplayAuctionMojoId = state.onDisplayAuctionMojoId + 1;
    },
  },
});

export const {
  setLastAuctionMojoId,
  setOnDisplayAuctionMojoId,
  setPrevOnDisplayAuctionMojoId,
  setNextOnDisplayAuctionMojoId,
} = onDisplayAuction.actions;

export default onDisplayAuction.reducer;
