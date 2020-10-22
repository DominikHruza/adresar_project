import React, { Fragment, useEffect, useState } from "react";
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

    //Pagination setup
    const idxLastContact = currentPage * itemsPerPage;
    const idxFirstContact = idxLastContact - itemsPerPage;
    let currentContacts = contacts.slice(idxFirstContact, idxLastContact);

    //On landing
    useEffect(() => {
        fetchContacts();
    }, []);

    //Watch for serch by changes and prop contacts
    useEffect(() => {
        console.log("uso");
        setPagedContacts([]);
        setContacts([]);
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
    }, [contactItems, searchBy]);

    // Control paignation
    useEffect(() => {
        currentContacts = contacts.slice(idxFirstContact, idxLastContact);
        setPagedContacts(currentContacts);
    }, [contacts, currentPage, sortBy, itemsPerPage, searchBy]);

    // Insert contact cards to DOM
    const renderContacts = (currentContacts) => {
        if (currentContacts.length > 0)
            return currentContacts.map((item) => {
                return (
                    <ContactCard
                        contactData={item}
                        key={item.id}
                        onContactCardClick={onEditClick}
                    />
                );
            });
    };

    // DASHBOARD FILTER CONTROLS
    //===============================

    //Search input field control
    const onSearchInput = (term) => {
        const filteredContacts = contactItems.filter((contactItem) => {
            //If search by email

            if (searchBy === "email") {
                return (
                    contactItem.contact
                        .toLowerCase()
                        .indexOf(term.toLowerCase()) !== -1 &&
                    contactItem.contactType.toLowerCase() === "email"
                );
            } else {
                return contactItem[searchBy].toLowerCase().indexOf(term) !== -1;
            }
        });

        setContacts(filteredContacts);
    };

    //Control search category change
    const onSearchBySelect = (category) => {
        setSearchBy(category);
    };

    // Control sorting by lastname (asc, desc)
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

    // Control items per page filter
    const onPerPageChange = (value) => {
        setItemsPerPage(parseInt(value));
        setCurrentPage(1);
    };

    // Redirect to edit screen
    const onEditClick = (cardId) => {
        history.push(`/kontakt/detalji/${cardId}`);
    };

    //Pagination callback
    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };
    return (
        <div id="dashboard">
            <div className="container">
                <div className="dashboard-controls">
                    <div className="control-item add-btn-wrap">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                history.push("/kontakt");
                            }}
                            className="add-contact-btn"
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    {contactItems.length > 0 ? (
                        <Fragment>
                            <div className="control-item search-filter">
                                <ContactFilter
                                    onSearchInput={onSearchInput}
                                    onSearchBySelect={onSearchBySelect}
                                />
                            </div>
                            <div className="control-item sort-filter">
                                <SortFilter onSortBySelect={onSortBySelect} />
                            </div>
                            <div className="control-item paginaton-filter">
                                <ItemsPerPageFilter
                                    onPerPageChange={onPerPageChange}
                                />
                            </div>{" "}
                        </Fragment>
                    ) : (
                        ""
                    )}
                </div>
                <Alert />
                {renderContacts(pageContacts)}
                {pageContacts && (
                    <Paginator
                        itemsPerPage={itemsPerPage}
                        maxItems={contacts.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                )}
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
