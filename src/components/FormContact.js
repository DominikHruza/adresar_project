import React from "react";
import ContactTypeForm from "./ContactTypeForm";
const FormContact = () => {
  return (
    <form>
      <div className="container">
        <div className="form-group">
          <label htmlFor="contactName">Name</label>
          <input
            type="text"
            className="form-control"
            id="contactName"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactLastname">Lastname</label>
          <input
            type="text"
            className="form-control"
            id="contactLastname"
            placeholder="Enter lastname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactBirthdate">Birthdate</label>
          <input type="date" className="form-control" id="contactBirthdate" />
        </div>
        <fieldset>
          <ContactTypeForm />
        </fieldset>
      </div>
    </form>
  );
};

export default FormContact;
