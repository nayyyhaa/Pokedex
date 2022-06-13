import "./navbar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchIp } from "redux/reducers/searchSlice";

export const Navbar = () => {
  const { searchIp } = useSelector((store) => store.searchReducer);
  const [userIp, setUserIp] = useState(searchIp);
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="centered-text">PokeDex</h1>
      <div className="nav-actions">
        <input
          type="text"
          value={userIp}
          onChange={(e) => setUserIp(e.target.value)}
        />
        <button onClick={() => dispatch(setSearchIp(userIp))}>search</button>
      </div>
    </>
  );
};
