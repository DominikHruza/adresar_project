import React from "react";
import { withRouter } from "react-router-dom";
import "./add-contact-styles.css";
import FormContact from "../../components/FormContact";
const AddContact = () => {
    return <FormContact />;
};

export default withRouter(AddContact);
