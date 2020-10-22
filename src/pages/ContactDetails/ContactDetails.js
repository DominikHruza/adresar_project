import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import Alert from "../../components/Alert";
import { useParams } from "react-router-dom";
import ContactCard from "../../components/ContactCard";
import { getSingleContact } from "../../actions/fetchContacts";
import "./contact-details-style.css";
import { deleteContact } from "../../actions/deleteContact";
const ContactDetails = ({
  history,
  contact,
  getSingleContact,
  deleteContact,
  setAlert,
}) => {
  //Get contact id from url
  const { id } = useParams();

  //search contact in props
  useEffect(() => {
    getSingleContact(id);
  }, []);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteContact(id);
    setAlert("Contact removed!", "success");
    history.push("/adresar");
  };
  return (
    <div id="contact-details" className="container">
      <Alert />
      <ContactCard contactData={contact} onDetails={true} />
      <div className="action-icons-container">
        <ul className="list-inline m-0">
          <li className="list-inline-item">
            <button
              className="btn btn-info btn-sm rounded-0"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
              onClick={() => {
                history.push(`/kontakt/detalji/${id}/azuriraj`);
              }}
            >
              <i className="fa fa-edit"></i>
            </button>
          </li>
          <li className="list-inline-item">
            <button
              className="btn btn-danger btn-sm rounded-0"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
              onClick={handleDeleteClick}
            >
              <i className="fa fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleContact: (id) => dispatch(getSingleContact(id)),
    deleteContact: (id) => dispatch(deleteContact(id)),
    setAlert: (message, type) => dispatch(setAlert(message, type)),
  };
};

const mapStateToProps = (state) => {
  return {
    contact: state.activeContact,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
