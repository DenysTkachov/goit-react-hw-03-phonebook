import React from "react";


export const ContactList = ({ contacts, handleDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
      </li>
    ))}
  </ul>
);