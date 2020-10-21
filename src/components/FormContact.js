import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import Alert from "./Alert";
import { editContact } from "../actions/editContact";
import { createContact } from "../actions/createContact";
import { withRouter } from "react-router-dom";

const FormContact = ({
  setAlert,
  createContact,
  uid,
  contact,
  onEdit,
  editContact,
  history,
}) => {
  const [inputState, setInputState] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    contact: "",
    contactType: "",
  });

  const { register } = useForm({ defaultValues: contact });
  useEffect(() => {
    // if contact object is not empty set inital values
    if (Object.keys(contact).length > 0) setInputState({ ...contact });
  }, []);

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

  const handleAddEditContact = (e) => {
    e.preventDefault();
    if (!makeContactValidations(inputState)) {
      controlSubformAlert();
      return;
    }

    if (onEdit) {
      editContact({ id: contact.id, ...inputState });
      setAlert("Contact updated succesfully!", "success");
      history.push(`/kontakt/detalji/${contact.id}`);
    } else {
      createContact({ uid, ...inputState });
      setAlert("Contact added succesfully!", "success");
    }
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
        <div className="col-lg-6 contact-form">
          <Alert />
          <div className="form-group">
            <label htmlFor="contactName">Name</label>
            <input
              ref={register}
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
              ref={register}
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
              ref={register}
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
                  ref={register}
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
                  ref={register}
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
            onClick={handleAddEditContact}
            type="submit"
            className="btn btn-success mt-3 "
          >
            {onEdit ? "Edit Contact" : "Add Contact"}
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
    editContact: (contactData) => dispatch(editContact(contactData)),
  };
};
const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    contact: state.activeContact,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FormContact));
