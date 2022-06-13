import { useDispatch } from "react-redux";
import { setUrl } from "redux/reducers/pokemonSlice";

export const Pagination = ({ prevUrl, nextUrl }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex-row">
      {prevUrl && (
        <button
          className="m-1"
          onClick={() => dispatch(setUrl({ url: prevUrl, count: -1 }))}
        >
          prev
        </button>
      )}
      {nextUrl && (
        <button
          className="m-1"
          onClick={() => dispatch(setUrl({ url: nextUrl, count: 1 }))}
        >
          next
        </button>
      )}
    </div>
  );
};
