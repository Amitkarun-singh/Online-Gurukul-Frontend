// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import classroomReducer from './reducers/classroomReducer'; // Corrected import path

const store = configureStore({
  reducer: {
    classroom: classroomReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredPaths: ['classroom.classRoomId'],
  //     },
  //   }),
});

export { store };