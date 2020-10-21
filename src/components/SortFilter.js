import React from "react";

const SortFilter = ({ onSortBySelect }) => {
  return (
    <div className="form-group col-md-4 col-sm-4 filter-sort filter">
      <select
        name="contactType"
        id="inputState"
        className="form-control"
        defaultValue="Sort by"
        onChange={(e) => onSortBySelect(e.target.value)}
      >
        <option>Sort By</option>
        <option value="lastname-asc">Lastname (A-Z)</option>
        <option value="lastname-desc">Lastname (Z-A)</option>
      </select>
    </div>
  );
};

export default SortFilter;
