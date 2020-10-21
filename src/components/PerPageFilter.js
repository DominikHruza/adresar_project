import React from "react";

const PerPageFilter = ({ onPerPageChange }) => {
  return (
    <div className="form-group col-md-4 col-sm-4 items-count-select filter">
      <label className="mr-3" htmlFor="inputState">
        Per page
      </label>
      <select
        onChange={(e) => {
          onPerPageChange(e.target.value);
        }}
        name="contactType"
        id="inputState"
        defaultValue="default"
      >
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
    </div>
  );
};

export default PerPageFilter;
