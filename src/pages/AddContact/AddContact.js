import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import FormContact from "../../components/FormContact/FormContact";
const AddContact = () => {
  return <FormContact />;
};

export default withRouter(AddContact);
