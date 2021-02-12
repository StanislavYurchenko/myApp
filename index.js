const argv = require('yargs').argv;
const contacts = require('./module/contacts');

// HOMEWORK 1
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const listContacts = await contacts.listContacts();
      console.log('List of the contacts', listContacts);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log('Contact', contact);
      break;

    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      console.log('Added contact', addedContact);
      break;

    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      console.log('Deleted contact', deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
