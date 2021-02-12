const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId);
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const contactForDelete = contacts.find(contact => contact.id === contactId);

    const newContacts = contacts.filter(contact => {
      return contact.id !== contactId;
    });
    const stringifiedNewContacts = JSON.stringify(newContacts, null, 2);

    await fs.writeFile(contactsPath, stringifiedNewContacts, 'utf8');
    return contactForDelete;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: uuidv4() };
    const newContacts = [...contacts, newContact];
    const stringifiedNewContacts = JSON.stringify(newContacts, null, 2);

    await fs.writeFile(contactsPath, stringifiedNewContacts, 'utf8');
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
