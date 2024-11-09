import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lectureId: null,
    videoId: null
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        addLectureId: (state, action) => {
            state.lectureId = action.payload;
        },
        addVideoId: (state, action) => {
            state.videoId = action.payload;
        },
        removeLectureId: (state) => {
            state.lectureId = null;
        },
        removeVideoId: (state) => {
            state.videoId = null;
        }
    }
});

export const { addLectureId, addVideoId, removeLectureId, removeVideoId } = videoSlice.actions;

export default videoSlice.reducer;
