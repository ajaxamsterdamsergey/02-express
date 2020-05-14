const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

exports.listContacts = () => fsPromises.readFile(contactsPath, "utf8");

exports.getContactById = async (contactId) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf8"));
  const ContactById = contacts.find((el) => el.id.toString() === contactId);
  return ContactById;
};

exports.removeContact = async (contactId) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf8"));
  const isIdIn = contacts.some((el) => el.id.toString() === contactId);

  if (isIdIn) {
    const listWithRemovedContact = JSON.stringify(
      contacts.filter((el) => el.id.toString() !== contactId)
    );
    fs.writeFile(contactsPath, listWithRemovedContact, (err) => {
      if (err) throw err;
    });
  }
  return isIdIn;
};

exports.addContact = async (name, email, phone) => {
  const id = shortid.generate();
  const newContact = { id, name, email, phone };
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf8"));
  const listWithAddedContact = JSON.stringify(
    contacts ? [...contacts, newContact] : [newContact]
  );
  fs.writeFile(contactsPath, listWithAddedContact, (err) => {
    if (err) throw err;
  });
  return newContact;
};
exports.updateContact = async (id, newProperties) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf8"));
  const updatedContact = contacts.find((el) => el.id.toString() === id);

  if (updatedContact) {
    newProperties.forEach((el) => (updatedContact[el[0]] = el[1]));
    const newContacts = JSON.stringify(
      contacts.map((el) => (el.id.toString() === id ? updatedContact : el))
    );

    fs.writeFile(contactsPath, newContacts, (err) => {
      if (err) throw err;
    });
  }

  return updatedContact;
};