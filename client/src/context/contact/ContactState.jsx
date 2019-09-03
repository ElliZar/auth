import React, {useReducer} from 'react';
import uuid from "uuid";
import ContactContex from "./contactContex";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        "_id" : 1,
        "type" : "personal",
        "name" : "Alesya",
        "email" : "alesy@gmail.com",
        "phone" : "350502473350"
      },
      {
        "_id" : 2,
        "type" : "personal",
        "name" : "yelyzar",
        "email" : "ellizorro111@gmail.com",
        "phone" : "123456"
      },
      {
      "_id" : 3,
      "type" : "professional",
      "name" : "Valentine",
      "email" : "Valentine@gmail.com",
      "phone" : "123456"
      },
    ],
    current: null,
    filter: null
  };
  const [state,dispatch] = useReducer(contactReducer,initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({type: ADD_CONTACT, payload: contact})
  };
  // Delete contact
  const deleteContact = (_id) => {
    dispatch({type: DELETE_CONTACT, payload: _id})
  };
  // Set current contact
  const setCurrentContact = (contact) => {
    dispatch({type: SET_CURRENT, payload: contact})
  }; 

  // Clear Current contact
  const clearCurrentContact = () => {
    dispatch({type: CLEAR_CURRENT})
  }; 
  // Update contact
  const updateCurrentContact = (contact) => {
    dispatch({type: UPDATE_CONTACT, payload: contact})
  }; 
  // Filter contacts
  const filterContacts = (text) => {
    dispatch({type: FILTER_CONTACTS, payload: text})
  }; 
  // Clear Filter
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER})
  }; 

  return (
    <ContactContex.Provider value={
      {contacts: state.contacts,
      current: state.current,
      filter: state.filter,
      addContact,
      deleteContact,
      setCurrentContact,
      clearCurrentContact,
      updateCurrentContact,
      filterContacts,
      clearFilter}}>
      {props.children}
    </ContactContex.Provider>
  )

}

export default ContactState;