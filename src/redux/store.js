import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokemonSlice";
import searchReducer from "./reducers/searchSlice";

export const store = configureStore({
  reducer: {
    pokemonReducer,
    searchReducer
  }
});
