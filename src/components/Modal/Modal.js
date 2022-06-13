import { useEffect, useState } from "react";
import { getPokemonById } from "redux/reducers/pokemonSlice";
import "./modal.css";
export const Modal = ({ modalData, setModalData }) => {
  const { isModalOpen, id } = modalData;
  const [currPokemon, setCurrPokemon] = useState(() => getPokemonById(id));
  useEffect(() => {
    (async () => {
      const res = await getPokemonById(id);
      setCurrPokemon(res);
    })();
  }, [id]);

  return (
    <div
      className={`modal-wrapper modal-wrapper-example grid-ctr ${
        isModalOpen ? "show-modal" : ""
      }`}
    >
      <div className="modal grid-ctr">
        <div className="modal-data flex-row full-wd">
          <img
            style={{ width: "130px", height: "130px" }}
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${currPokemon?.id}.svg`}
            alt="pokemon"
          />
          <div className="modal-description">
            <p>Id: {currPokemon?.id}</p>
            <p>Name: {currPokemon?.name}</p>
            <p>
              Abilities:{" "}
              {currPokemon?.abilities?.map((ab) => (
                <span>{ab.ability.name}, </span>
              ))}
            </p>
          </div>
        </div>
        <button
          className="btn primary-btn example-modal-close-btn m-1 w-50p"
          onClick={() => setModalData({ isModalOpen: false, id: null })}
        >
          Close
        </button>
      </div>
    </div>
  );
};
