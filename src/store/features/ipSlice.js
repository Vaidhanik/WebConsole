import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // ip:{
  //   ip: "192.168.7.204",
  //   mac: "abhinav mac"
  // }
  ip: null
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