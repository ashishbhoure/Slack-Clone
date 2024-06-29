import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        roomId: null,
        roomName: null,
    },
    reducers: {
        enterRoom: (state, action) => {
            state.roomId = action.payload.roomId;
            state.roomName = action.payload.roomName;
        },
    },
});

export const {enterRoom} = appSlice.actions;
export default appSlice.reducer;