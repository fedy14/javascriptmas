/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the checkDuplicate() function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

*Your tasks:*
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.
 
*Stretch Goals:*
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - "Cat Hammock" should be flagged as a duplicate of "cat hammock".
   - Preserve Grandpa’s original capitalization (e.g., if "Cat Hammock" is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');
const listArr = []; // Stores the original case-sensitive items
const normalizedSet = new Set(); // Tracks normalized items for duplicate checking

// Function to normalize the input (trim spaces, remove extra spaces, make lowercase)
function normalizeInput(input) {
    return input.trim().replace(/\s+/g, ' ').toLowerCase();
}

// Function to check if the item is a duplicate and add it if unique
function checkDuplicate() {
    const itemText = itemInput.value;
    const normalizedText = normalizeInput(itemText);

    if (normalizedSet.has(normalizedText)) {
        alert('Duplicate item! Please enter a unique gift.');
    } else if (itemText.trim() !== '') {
        listArr.push(itemText); // Add original case-sensitive item
        normalizedSet.add(normalizedText); // Add normalized version to the set
        renderList();
    }

    itemInput.value = ''; // Clear the input field
}

// Function to render the shopping list
function renderList() {
    shoppingList.innerHTML = ''; // Clear the existing list
    listArr.forEach((gift, index) => {
        const listItem = document.createElement('li');

        // Add item text
        const itemText = document.createElement('span');
        itemText.textContent = gift;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
            deleteItem(index);
        });

        listItem.appendChild(itemText);
        listItem.appendChild(deleteButton);
        shoppingList.appendChild(listItem);
    });
}

// Function to delete an item from the list
function deleteItem(index) {
    const removedItem = listArr.splice(index, 1)[0]; // Remove item from the original list
    const normalizedText = normalizeInput(removedItem);
    normalizedSet.delete(normalizedText); // Remove from the normalized set
    renderList();
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate);

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});