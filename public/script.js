// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
const client = feathers();
client.configure(feathers.socketio(socket));

// Add a global listener so we don't have to keep rebinding
const addMyEventListener = (selector, event, handler) => {
  document.addEventListener(event, async (ev) => {
    if (ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

/**
 * Fetch all the existing items on load
 */
const getAllItems = async () => {
  const items = await client.service('items').find({ limit: 50 });
  for (let item of items.data) {
    addItem(item);
  }
};
getAllItems();

/**
 * Add an item to the list when user clicks the Add button
 */
addMyEventListener('#addItem', 'click', async (e) => {
  e.preventDefault();
  const item = document.getElementById('itemName');
  const quantity = document.getElementById('itemAmount');
  if (!item.value || !quantity.value) {
    return; //simple validation
  }

  // Create a new item and then clear the input field
  await client.service('items').create({
    item: item.value,
    quantity: quantity.value,
  });
  item.value = quantity.value = '';
});

/**
 * Remove an item when user clicks Remove link
 */
addMyEventListener('[data-remove-item]', 'click', async (e) => {
  e.preventDefault();
  client.service('items').remove(e.target.dataset.removeItem);
  e.target.innerHTML = 'deleting...';
});

/**
 * Event handler for the item created event
 */
const addItem = (item) => {
  const list = document.getElementById('list');
  if (list) {
    list.innerHTML += `
      <li>${item.quantity} X ${item.item} - 
          <a data-remove-item="${item.id}" href="#">Remove</a>
      </li>`;
  }
};
client.service('items').on('created', addItem);

/**
 * Event handler for the item removed event
 */
client.service('items').on('removed', (item) => {
  document
    .querySelector(`[data-remove-item="${item.id}"]`)
    .closest('li')
    .remove();
});
