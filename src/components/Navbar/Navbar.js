import "./navbar.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchIp } from "redux/reducers/searchSlice";
import { getAllPokemonsByTypes } from "redux/reducers/pokemonSlice";

export const Navbar = () => {
  const { searchIp } = useSelector((store) => store.searchReducer);
  const [userIp, setUserIp] = useState(searchIp);
  const dispatch = useDispatch();
  const [types, setTypes] = useState();
  const [type, setType] = useState("select");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    (async () => {
      let res = await getAllPokemonsByTypes();
      setTypes(res);
    })();
  }, []);
  return (
    <>
      <h1 className="centered-text">PokeDex</h1>
      <div className="nav-actions flex-row">
        <div>
          <input
            type="text"
            value={userIp}
            onChange={(e) => setUserIp(e.target.value)}
          />
          <button onClick={() => dispatch(setSearchIp(userIp))}>search</button>
        </div>
        <select value={type} onChange={handleChange} className="p-05">
          {types?.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
