import React from "react";

const ItemsPerPageFilter = () => {
  return (
    <div className="form-group col-md-4 col-sm-4 items-count-select filter">
      <label className="mr-3" htmlFor="inputState">
        Per page
      </label>
      <select name="contactType" id="inputState" defaultValue="default">
        <option value="default">15</option>
        <option>30</option>
        <option>40</option>
      </select>
    </div>
  );
};

export default ItemsPerPageFilter;
