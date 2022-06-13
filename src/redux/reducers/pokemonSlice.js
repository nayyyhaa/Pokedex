import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allPokemons: [],
  pokemons: [],
  pokemonImg: [],
  currentUrl: "https://pokeapi.co/api/v2/pokemon",
  nextUrl: "",
  prevUrl: "",
  pagecount: 0
};

export const getAllPokemons = createAsyncThunk(
  "pokemons/getAllPokemons",
  async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=807`);
      const poke = await res.json();
      return poke.results;
    } catch (err) {
      console.error("Error in getting pokemons");
    }
  }
);
export const getPokemons = createAsyncThunk(
  "pokemons/getPokemons",
  async (currentUrl) => {
    try {
      const res = await fetch(currentUrl);
      return await res.json();
    } catch (err) {
      console.error("Error in getting pokemons");
    }
  }
);

export const getPokemonById = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    return await res.json();
  } catch (err) {
    console.error("Error in getting pokemon by id");
  }
};

export const getAllPokemonsByTypes = async () => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type`);
    const types = await res.json();
    return types.results;
  } catch (err) {
    console.error("Error in getting pokemon by types");
  }
};

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setUrl: (state, action) => {
      state.currentUrl = action.payload.url;
      state.pagecount = state.pagecount + action.payload.count;
    }
  },
  extraReducers: {
    [getPokemons.fulfilled]: (state, action) => {
      state.pokemons = action.payload.results.map((poke, i) => ({
        ...poke,
        id: i + state.pagecount * 20 + 1,
        img: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
          i + state.pagecount * 20 + 1
        }.svg`
      }));
      state.nextUrl = action.payload.next;
      state.prevUrl = action.payload.previous;
    },
    [getAllPokemons.fulfilled]: (state, action) => {
      state.allPokemons = action.payload.map((poke, i) => ({
        ...poke,
        id: i + 1,
        img: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
          i + 1
        }.svg`
      }));
    }
  }
});

export const { setPokemons, setUrl } = pokemonSlice.actions;
export default pokemonSlice.reducer;
