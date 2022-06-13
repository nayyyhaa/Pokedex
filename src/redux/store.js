import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemonReducer
  }
});
