import React from "react";

const ContactsFilter = ({ onSearchInput, onSearchBySelect }) => {
  return (
    <div className="form-group col-md-4 col-sm-4 filter-contacts filter">
      <input
        onChange={(e) => onSearchInput(e.target.value)}
        type="text"
        placeholder="Search by"
      />
      <select
        name="contactType"
        id="inputState"
        className="form-control"
        defaultValue="name"
        onChange={(e) => onSearchBySelect(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="lastName">Lastname</option>
        <option value="email">Email</option>
      </select>
    </div>
  );
};

export default ContactsFilter;
