'use strict';

class Contact {
    _name;
    _city;
    _email;

    constructor(name, city, email) {
        this._name = name;
        this._city = city;
        this._email = email;
    }

    get name() { return this._name; }
    get city() { return this._city; }
    get email() { return this._email; }

    getInfo() {
        return `${this._name} ${this._city} ${this._email}`;
    }
}

const addButton = document.querySelector('.add');
const contacts = document.querySelector('.contacts');
const box = document.querySelector('.box');
const output = document.querySelector('.output');

let contactsArray = [];

function updateCount() {
    let divCount = 0;
    for (let i = 0; i < box.children.length; i++) {
        if (box.children[i].classList.contains('deletable')) {
            divCount++;
        }
    }
    output.textContent = `Total contacts: ${divCount}`;
}

addButton.addEventListener('click', function() { 

    let pattern = /^([^,]*,){2}[^,]*$/;
    if (contacts.value.includes('@') && pattern.test(contacts.value)) {
        if (contacts.value.endsWith('.com') || contacts.value.endsWith('.ca')){
            const name = contacts.value.split(',')[0];
            const city = contacts.value.split(',')[1];
            const email = contacts.value.split(',')[2];
            const contact = new Contact(name, city, email);
            contactsArray.push(contact);

            // Call the listContacts() function to display the contacts
            listContacts();

            // Update the div count and display it
            updateCount();

        } else {
            output.innerHTML = `Incorrect format`;
        }
    } else {
        output.innerHTML = `Incorrect format`;
    }
    contacts.value = '';
});
 

// Define the listContacts() function
function listContacts() {
// Remove all existing contact divs
  while (box.firstChild) {
    box.removeChild(box.firstChild);
 }
//Iterate through the contacts array
    for (let i = 0; i < contactsArray.length; i++) {
      const contact = contactsArray[i];

      // Create a new div element for the contact
      const contactDiv = document.createElement("div");

      // Create three paragraphs for the contact's data
      const namePara = document.createElement("p");
      namePara.textContent = `Name: ${contact.name}`;
      const cityPara = document.createElement("p");
      cityPara.textContent = `City: ${contact.city}`;
      const emailPara = document.createElement("p");
      emailPara.textContent = `email: ${contact.email}`;
    
      // Append the paragraphs to the contact div
      contactDiv.appendChild(namePara);
      contactDiv.appendChild(cityPara);
      contactDiv.appendChild(emailPara);

      // Add the contact div to the box div
      contactDiv.classList.add('savecontact', 'deletable');
      box.insertBefore(contactDiv,box.firstChild);

      contactDiv.onclick = function() {
        contactDiv.parentNode.removeChild(contactDiv);
        updateCount();
      };
    }
}







