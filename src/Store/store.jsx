import { configureStore } from "@reduxjs/toolkit";
import chatSlice from './chartSlice'
import themeReducer from './themeSlice'


const store = configureStore({
  reducer: {
    chattwo:chatSlice,
    theme:themeReducer,

  },
});

export default store;