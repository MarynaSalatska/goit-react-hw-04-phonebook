import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { FriendForm } from './FriendForm/FriendForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
const LOCAL_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: this.getLocalData() ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  getLocalData() {
    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    return localData;
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
  }

  addContacts = contact => {
    const isExist = this.state.contacts.some(({ name }) => {
      return contact.name === name;
    });
    if (isExist) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(), ...contact }],
      };
    });
  };
  deleteContacts = e => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== e.target.id
        ),
      };
    });
  };

  handleFilterChange = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  render() {
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase())
    );
    return (
      <>
        <h1>Phonebook</h1>
        <FriendForm onSubmit={this.addContacts} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} value={this.state.filter} />
        <ContactsList
          contacts={filterContacts}
          onBtnDelete={this.deleteContacts}
        />
      </>
    );
  }
}
