import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import Alert from "../../components/Alert";
import "./form-contact-styles.css";
import { createContact } from "../../actions/createContact";

const FormContact = ({ setAlert, createContact, uid }) => {
  const [inputState, setInputState] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    contact: "",
    contactType: "",
  });

  const controlSubformAlert = () => {
    if (inputState.contact === "" || inputState.contactType === "") {
      const node = document.createElement("div");
      const textnode = document.createTextNode("Contact and type are required");
      node.appendChild(textnode);
      node.classList.add("alert");
      node.classList.add("alert-danger");
      document.getElementById("subform-alert").appendChild(node);

      setTimeout(() => {
        if (document.getElementById("subform-alert")) {
          document.getElementById("subform-alert").innerHTML = "";
        }
      }, 5000);
    }
  };

  const handleInputChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!makeContactValidations(inputState)) {
      controlSubformAlert();
      return;
    }

    createContact({ uid, ...inputState });
  };

  const makeContactValidations = (inputsData) => {
    const { name, lastName, contact, contactType } = inputsData;
    let areValid = true;

    if (name.length > 100) {
      setAlert("Name is too long!", "danger");
      areValid = false;
    }

    if (lastName.length > 300) {
      setAlert("Lastname is too long!", "danger");
      areValid = false;
    }

    if (lastName === "" || name === "") {
      setAlert("Name and lastname are required!", "danger");
      areValid = false;
    }

    if (contact === "" || contactType === "") {
      areValid = false;
    }

    return areValid;
  };

  return (
    <form className="mt-4">
      <div className="container">
        <div className="col-lg-6">
          <Alert />
          <div className="form-group">
            <label htmlFor="contactName">Name</label>
            <input
              name="name"
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="contactName"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactLastname">Lastname</label>
            <input
              name="lastName"
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="contactLastname"
              placeholder="Enter lastname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactBirthdate">Birthdate</label>
            <input
              name="birthDate"
              type="date"
              className="form-control"
              id="contactBirthdate"
              onChange={handleInputChange}
            />
          </div>
          <div className="contact-type-container">
            <div id="subform-alert"></div>
            <div className="form-row">
              <div className="form-group col-md-6 col-sm-6 contact-type-group">
                <label htmlFor="inputCity">Contact</label>
                <input
                  name="contact"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="Enter contact"
                />
              </div>
              <div className="form-group col-md-4 col-sm-4 contact-type-group">
                <label htmlFor="inputState">Type</label>
                <select
                  name="contactType"
                  onChange={handleInputChange}
                  id="inputState"
                  className="form-control"
                  defaultValue="default"
                >
                  <option disabled value="default">
                    Select option
                  </option>
                  <option>Email</option>
                  <option>Fiksni telefon</option>
                  <option>Mobitel</option>
                  <option>Pager</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddContact}
            type="submit"
            className="btn btn-success mt-3 "
          >
            Add Contact
          </button>
        </div>
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (message, type) => dispatch(setAlert(message, type)),
    createContact: (contactData) => dispatch(createContact(contactData)),
  };
};
const mapStateToProps = ({ firebase }) => {
  return {
    uid: firebase.auth.uid,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormContact);
