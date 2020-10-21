import React from "react";
import faker from "faker";
import { addFavorite, removeFavorite } from "../actions/editContact";
import { connect } from "react-redux";
const ContactCard = ({
  contactData,
  onContactCardClick,
  addFavorite,
  removeFavorite,
}) => {
  const handleFavoriteAddRemove = () => {
    if (contactData.isFavorite) {
      removeFavorite(contactData.id);
    } else {
      addFavorite(contactData.id);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-item-wrapper">
          <div className="card-item">
            <img src={faker.image.avatar()} alt="Avatar" className="avatar" />
          </div>
          <div className="card-item">
            <h5>Name</h5>
            <p>{contactData.name}</p>
          </div>
          <div className="card-item">
            <h5>Lastname</h5>
            <p>{contactData.lastName}</p>
          </div>
          <div className="card-item">
            <h5>Birthdate</h5>
            <p>{contactData.birthDate}</p>
          </div>
          <div className="card-item">
            <h5>Contact</h5>
            <p>{contactData.contact}</p>
          </div>
          <div className="card-item">
            <h5>Type</h5>
            <p>{contactData.contactType}</p>
          </div>
          <div className="card-item">
            <button className="favorite-btn" onClick={handleFavoriteAddRemove}>
              <i
                className={`${
                  contactData.isFavorite
                    ? "fas fa-star isFavorite"
                    : "far fa-star"
                } favorite-icon`}
              ></i>
            </button>
          </div>
          <div className="card-item">
            <button
              className="details-btn"
              onClick={() => {
                onContactCardClick(contactData.id);
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (id) => dispatch(addFavorite(id)),
    removeFavorite: (id) => dispatch(removeFavorite(id)),
  };
};

export default connect(null, mapDispatchToProps)(ContactCard);
