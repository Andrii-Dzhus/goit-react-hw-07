import { useSelector, useDispatch } from "react-redux";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.container}>
      <p>Find contact by name</p>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className={css.input}
      />
    </div>
  );
}
