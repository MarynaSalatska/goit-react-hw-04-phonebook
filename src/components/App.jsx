import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { FriendForm } from './FriendForm/FriendForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
const LOCAL_KEY = 'contacts';

export function App() {
  const getLocalData = () => {
    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    return localData;
  };
  //якби був null in contacts []
  const [contacts, setContacts] = useState(
    getLocalData() ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  // if (contacts.length !== contacts.length) {
  // } якби був null in contacts [] то треба перевірка
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = contact => {
    const isExist = contacts.some(({ name }) => {
      return contact.name === name;
    });
    if (isExist) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }
    setContacts([...contacts, { id: nanoid(), ...contact }]);
  };

  const deleteContacts = e => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== e.target.id)
    );
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <FriendForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <ContactsList contacts={filterContacts} onBtnDelete={deleteContacts} />
    </>
  );
}
