import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  pokemonImg: [],
  currentUrl: "https://pokeapi.co/api/v2/pokemon",
  nextUrl: "",
  prevUrl: ""
};

export const getPokemons = createAsyncThunk(
  "pokemons/getPokemons",
  async (currentUrl) => {
    try {
      const res = await fetch(currentUrl);
      const poke = await res.json();
      return poke;
    } catch (err) {
      console.error("Error in getting pokemons");
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setUrl: (state, action) => {
      state.currentUrl = action.payload.url;
    }
  },
  extraReducers: {
    [getPokemons.fulfilled]: (state, action) => {
      state.pokemons = action.payload.results;
      state.nextUrl = action.payload.next;
      state.prevUrl = action.payload.previous;
    }
  }
});

export const { setPokemons, setUrl } = pokemonSlice.actions;
export default pokemonSlice.reducer;
