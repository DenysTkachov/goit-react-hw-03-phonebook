import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm ';
import { ContactList } from './ContactList/ContactList ';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
  
  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  handleAddContact = (newContact) => {
const { name, number } = newContact;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const isDuplicate = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const id = nanoid();

  
    this.setState(prevState => ({
      contacts: [...prevState.contacts, {id, name, number}],
    }));

     this.setState(
       prevState => ({
         contacts: [...prevState.contacts, newContact],
       }),
       () => {
         localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
       }
     );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));

     this.setState(
       prevState => ({
         contacts: prevState.contacts.filter(contact => contact.id !== id),
       }),
       () => {
         localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
       }
     );
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

