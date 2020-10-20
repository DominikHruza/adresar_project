import React, { Fragment } from "react";
import "./dashboard-styles.css";
import { withRouter } from "react-router-dom";
const Dashboard = ({ history }) => {
  const handleAddClick = (e) => {
    e.preventDefault();

    history.push("/kontakt");
  };

  return (
    <div>
      <button onClick={handleAddClick} className="add-contact-btn">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default withRouter(Dashboard);
