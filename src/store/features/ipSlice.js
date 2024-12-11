import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ip: null,
};

const ipSlice = createSlice({
  name: 'ip',
  initialState,
  reducers: {
    setIp: (state, action) => {
      state.ip = action.payload;
    },
  },
});

export const { setIp } = ipSlice.actions;
export const selectIp = (state) => state.ip.ip;
export default ipSlice.reducer;