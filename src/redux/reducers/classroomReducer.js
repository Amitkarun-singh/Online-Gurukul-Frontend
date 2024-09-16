// redux/reducers/classroomReducer.js
import { createSlice } from '@reduxjs/toolkit';
  export const classroomSlice = createSlice({
    name: 'classroom',
    initialState: {
      classRoomId: null,
    },
    reducers: {
      setClassRoomId: (state, action) => {
        state.classRoomId = action.payload;
      },
    },
  });

  export const { setClassRoomId } = classroomSlice.actions;
  export default classroomSlice.reducer;
 