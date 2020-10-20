import React from "react";
import faker from "faker";
const ContactCard = ({ contactData }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-item-wrapper">
          <div className="card-item">
            <img src={faker.image.avatar()} alt="Avatar" className="avatar" />
          </div>
          <div className="card-item">
            <h6>Name</h6>
            <p>{contactData.name}</p>
          </div>
          <div className="card-item">
            <h6>Lastname</h6>
            <p>{contactData.lastName}</p>
          </div>
          <div className="card-item">
            <h6>Birthdate</h6>
            <p>{contactData.birthDate}</p>
          </div>
          <div className="card-item">
            <h6>Contact</h6>
            <p>{contactData.contact}</p>
          </div>
          <div className="card-item">
            <h6>Type</h6>
            <p>{contactData.contactType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
