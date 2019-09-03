import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from "../../context/contact/contactContex";

const ContactItem = ({contact}) => {
  const {_id, name, email, phone, type} = contact;
  const contactContex = useContext(ContactContext);

  const {deleteContact,setCurrentContact, clearCurrentContact} = contactContex;

  const deleteC = () => {
    deleteContact(_id);
    clearCurrentContact();
  };

  return (
    <div className="card bg-light" key={_id}>
      <h3 className="text-primary text-left">
        {name}{" "} <span style={{float: "right"}}
        className={"badge " + ((type === "professional" )? "badge-primary" : "badge-success")}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (<li>
          <i className="fas fa-envelope-open"></i> {email}
        </li>) }
        {phone && (<li>
          <i className="fas fa-phone"></i> {phone}
        </li>) }
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={() => setCurrentContact(contact)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={deleteC}>Delete</button>
      </p>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};


export default ContactItem
