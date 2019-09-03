import React, {Fragment, useContext} from 'react'
import ContactContext from "../../context/contact/contactContex"
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const {contacts, filter} = contactContext;
  if (contacts.length === 0) {
    return <p>Please, add a contact</p>
  }
  return (
    <Fragment>
      {filter !== null ? filter.map(contact => {
        return <ContactItem key={contact._id} contact={contact}/>
      }): contacts.map(contact => (
        <ContactItem key={contact._id} contact={contact}/>
      ))}
    </Fragment>
  )
}

export default Contacts
