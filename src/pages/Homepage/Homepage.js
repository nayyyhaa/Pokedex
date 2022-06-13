import "./homepage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Modal, Pagination } from "components";
import { getPokemons, getAllPokemons } from "redux/reducers/pokemonSlice";
import { searchPokemon } from "utils";

export const Homepage = () => {
  const { pokemons, allPokemons, nextUrl, prevUrl, currentUrl } = useSelector(
    (store) => store.pokemonReducer
  );
  const [modalData, setModalData] = useState({ isModalOpen: false, id: null });

  const { searchIp } = useSelector((store) => store.searchReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
  }, []);

  useEffect(() => {
    dispatch(getPokemons(currentUrl));
  }, [currentUrl]);

  const pokemonsList = searchPokemon(allPokemons, pokemons, searchIp);

  return (
    <div className="homepage">
      {searchIp && (
        <h2 className="searched-text">Searched Pokemon: {searchIp}</h2>
      )}
      <div className="pokemon-cards-grid">
        {pokemonsList?.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            setModalData={setModalData}
          />
        ))}
      </div>
      {searchIp && pokemonsList.length === 0 && (
        <p className="centered-text p-1">No data found!</p>
      )}
      {!searchIp && <Pagination prevUrl={prevUrl} nextUrl={nextUrl} />}
      {modalData?.isModalOpen && (
        <Modal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};
