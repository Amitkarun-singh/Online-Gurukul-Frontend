import { createSlice } from "@reduxjs/toolkit";

export const ClassroomSlice = createSlice({
    name:"classRooms",
    initialState:{
        classRooms:[],
        isCreateModalOpen:false,
        isJoinModalOpen:false,
    },
    reducers:{
        show:(state, action) => {
            state.classRooms = action.payload;
        },
        createModalOpen:(state) => {
            state.isCreateModalOpen = true;
        },
        createModalClose:(state) => {
            state.isCreateModalOpen = false;
        },
        joinModalOpen:(state) => {
            state.isJoinModalOpen = true;
        },
        joinModalClose:(state) => {
            state.isJoinModalOpen = false;
        }
    }
});

export const { show, createModalOpen, createModalClose, joinModalOpen, joinModalClose } = ClassroomSlice.actions;
export default ClassroomSlice.reducer;