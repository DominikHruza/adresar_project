import React from "react";

const ContactTypeForm = () => {
  return (
    <form>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">Contact</label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">Contact Type</label>
          <select id="inputState" className="form-control">
            <option>Email</option>
            <option>Fiksni telefon</option>
            <option>Mobitel</option>
            <option>Pager</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default ContactTypeForm;
