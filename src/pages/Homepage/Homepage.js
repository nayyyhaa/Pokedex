import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, setUrl } from "../../redux/reducers/pokemonSlice";

export const Homepage = () => {
  const { pokemons, nextUrl, prevUrl, currentUrl } = useSelector(
    (store) => store.pokemonReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons(currentUrl));
  }, [currentUrl]);

  return (
    <>
      {pokemons?.map((pokemon) => (
        <h2 key={pokemon.url}>{pokemon.name}</h2>
      ))}
      {prevUrl && (
        <button onClick={() => dispatch(setUrl({ url: prevUrl }))}>prev</button>
      )}
      {nextUrl && (
        <button onClick={() => dispatch(setUrl({ url: nextUrl }))}>next</button>
      )}
    </>
  );
};
