import React from "react";

const ContactsFilter = () => {
  return (
    <div className="form-group col-md-4 col-sm-4 filter-contacts filter">
      <label className="mr-3" htmlFor="inputState">
        Search by
      </label>
      <select
        name="contactType"
        id="inputState"
        className="form-control"
        defaultValue="default"
      >
        <option value="default">Name</option>
        <option>Lastname</option>
        <option>Email</option>
      </select>
    </div>
  );
};

export default ContactsFilter;
