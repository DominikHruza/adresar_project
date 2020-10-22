import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./dashboard-styles.css";
import { withRouter } from "react-router-dom";
import { sortContacts } from "../../helpers/sortContacts";
import { fetchContacts } from "../../actions/fetchContacts";
import ContactCard from "../ContactCard";
import Paginator from "../Paginator";
import ItemsPerPageFilter from "../PerPageFilter";
import ContactFilter from "../ContactFilter";
import SortFilter from "../SortFilter";
import Alert from "../Alert";

const Dashboard = ({
  history,
  auth,
  fetchContacts,
  contactItems,
  filterFavorites,
}) => {
  const [contacts, setContacts] = useState([]);
  const [pageContacts, setPagedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchBy, setSearchBy] = useState("name");
  const [sortBy, setSortBy] = useState("");

  //For pagination
  const idxLastContact = currentPage * itemsPerPage;
  const idxFirstContact = idxLastContact - itemsPerPage;
  let currentContacts = contacts.slice(idxFirstContact, idxLastContact);
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (contactItems.length > 0) {
      if (filterFavorites) {
        const filteredFavorites = contactItems.filter((item) => {
          return item.isFavorite === true;
        });
        setContacts(filteredFavorites);
      } else {
        setContacts(contactItems);
      }
    }
  }, [contactItems]);

  useEffect(() => {
    //For pagination
    currentContacts = contacts.slice(idxFirstContact, idxLastContact);
    setPagedContacts(currentContacts);
  }, [contacts, currentPage, sortBy, itemsPerPage]);

  const renderContacts = (currentContacts) => {
    if (currentContacts.length > 0)
      return currentContacts.map((item) => {
        return (
          <ContactCard
            contactData={item}
            key={item.id}
            onContactCardClick={onContactCardClick}
          />
        );
      });
  };

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const onSearchInput = (term) => {
    const filteredContacts = contactItems.filter((contact) => {
      //If search by email

      if (searchBy === "email") {
        return (
          contact.contact.toLowerCase().indexOf(term) !== -1 &&
          contact.contactType.toLowerCase() === "email"
        );
      } else {
        return contact[searchBy].toLowerCase().indexOf(term) !== -1;
      }
    });

    setContacts(filteredContacts);
  };

  const onSearchBySelect = (category) => {
    setSearchBy(category);
  };

  const onSortBySelect = (value) => {
    let sortedContacts;

    if (value === "lastname-asc") {
      sortedContacts = sortContacts(contacts, "asc");
    }

    if (value === "lastname-desc") {
      sortedContacts = sortContacts(contacts, "desc");
    }
    setSortBy(value);
    setContacts(sortedContacts);
  };

  const onPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const onContactCardClick = (cardId) => {
    history.push(`/kontakt/detalji/${cardId}`);
  };

  return (
    <div id="dashboard">
      <div className="container">
        <div className="dashboard-controls">
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push("/kontakt");
            }}
            className="add-contact-btn"
          >
            <i className="fas fa-plus"></i>
          </button>
          <div className="filter-group">
            <ContactFilter
              onSearchInput={onSearchInput}
              onSearchBySelect={onSearchBySelect}
            />
            <SortFilter onSortBySelect={onSortBySelect} />
            <ItemsPerPageFilter onPerPageChange={onPerPageChange} />
          </div>
        </div>
        <Alert />
        {renderContacts(pageContacts)}
        <Paginator
          itemsPerPage={itemsPerPage}
          maxItems={contacts.length}
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
