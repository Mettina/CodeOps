import { memo } from "react";
import PropTypes from "prop-types";

function CategoryBar({ categories, selected, onSelect }) {
  //console.log("CategoryBar rendered");
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "chip chip-selected" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default memo(CategoryBar);