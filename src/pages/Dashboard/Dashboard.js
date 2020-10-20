import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./dashboard-styles.css";
import { withRouter } from "react-router-dom";

import { createContact, fetchContacts } from "../../actions/fetchContacts";
import ContactCard from "../../components/ContactCard";
import Paginator from "../../components/Paginator";
import ItemsPerPageFilter from "../../components/ItemsPerPageFilter";
import ContactFilter from "../../components/ContactFilter";

const Dashboard = ({ history, auth, fetchContacts, contactItems }) => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const idxLastContact = currentPage * itemsPerPage;
  const idxFirstContact = idxLastContact - itemsPerPage;
  const currentContacts = contactItems.slice(idxFirstContact, idxLastContact);
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddClick = (e) => {
    e.preventDefault();
    history.push("/kontakt");
  };

  const renderContacts = (currentContacts) => {
    if (currentContacts.length > 0)
      return currentContacts.map((item) => {
        return <ContactCard contactData={item} key={item.id} />;
      });
  };

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };
  return (
    <div id="dashboard">
      <div className="container">
        <div className="dashboard-controls">
          <button onClick={handleAddClick} className="add-contact-btn">
            <i className="fas fa-plus"></i>
          </button>
          <div className="filter-group">
            <ContactFilter />
            <ItemsPerPageFilter />
          </div>
        </div>
        {renderContacts(currentContacts)}
        <Paginator
          itemsPerPage={itemsPerPage}
          maxItems={contactItems.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    contactItems: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(fetchContacts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
