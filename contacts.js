const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

// Get list of all contacts
function listContacts() {
	fs.readFile(contactsPath)
		.then((data) => console.log(data.toString())) // Display the file content as a string
		.catch((err) => console.log(err.message)); // Handle errors
}

// Get a contact by ID
function getContactById(contactId) {
	fs.readFile(contactsPath)
		.then((data) => JSON.parse(data)) // Parse the content as a JSON object
		.then((parsedData) =>
			console.log(parsedData.filter((el) => el.id === contactId))
		) // Filter and display the contact with the given ID
		.catch((err) => console.log(err.message)); // Handle errors
}

// Remove a contact by ID
async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		const contactIndex = contacts.findIndex(
			(contact) => contact.id === contactId
		); // Find the index of the contact with the given ID
		if (contactIndex !== -1) {
			contacts.splice(contactIndex, 1); // Remove the contact from the array
			await fs.writeFile(
				contactsPath,
				JSON.stringify(contacts, null, 2),
				"utf8"
			); // Save the changes
			console.log("Contact has been removed.");
		} else {
			console.log("Contact with the given ID was not found.");
		}
	} catch (parseError) {
		console.error(
			"Error parsing the contents of the contacts.json file:",
			parseError
		);
	}
}

// Add a new contact
async function addContact(name, email, phone) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		const newContact = {
			id: "qdggE76Jtbfd9eWJHrssH",
			name: name,
			email: email,
			phone: phone,
		};
		contacts.push(newContact); // Add the new contact to the array
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8"); // Save the changes
		console.log("Contact has been added.");
	} catch (error) {
		console.error("An error occurred:", error);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
