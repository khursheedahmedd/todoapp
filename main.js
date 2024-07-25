document.getElementById('add').addEventListener('click', function () {
    const itemText = document.getElementById('item').value;
    if (itemText !== '') {
        addItemToTodoList(itemText);
        saveToLocalStorage();
        document.getElementById('item').value = '';
    }
});

window.addEventListener('load', function () {
    loadFromLocalStorage();
});

function addItemToTodoList(itemText) {
    const todoList = document.getElementById('todo');
    const listItem = document.createElement('li');
    listItem.className = 'flex justify-between items-center bg-white p-2 border border-gray-300 rounded mb-2 shadow';

    const span = document.createElement('span');
    span.textContent = itemText;
    listItem.appendChild(span);

    const buttons = document.createElement('div');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 ml-2 mb-2';
    completeButton.addEventListener('click', function () {
        listItem.remove();
        addItemToCompletedList(itemText);
        saveToLocalStorage();
    });
    buttons.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2';
    deleteButton.addEventListener('click', function () {
        listItem.remove();
        saveToLocalStorage();
    });
    buttons.appendChild(deleteButton);

    listItem.appendChild(buttons);
    todoList.appendChild(listItem);
}

function addItemToCompletedList(itemText) {
    const completedList = document.getElementById('completed');
    const listItem = document.createElement('li');
    listItem.className = 'flex justify-between items-center bg-gray-200 p-2 border border-gray-300 rounded mb-2 shadow';

    const span = document.createElement('span');
    span.textContent = itemText;
    listItem.appendChild(span);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2';
    deleteButton.addEventListener('click', function () {
        listItem.remove();
        saveToLocalStorage();
    });
    listItem.appendChild(deleteButton);

    completedList.appendChild(listItem);
}

function saveToLocalStorage() {
    const todoItems = [];
    const completedItems = [];

    document.querySelectorAll('#todo li span').forEach(item => todoItems.push(item.textContent));
    document.querySelectorAll('#completed li span').forEach(item => completedItems.push(item.textContent));

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
}

function loadFromLocalStorage() {
    const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    const completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];

    todoItems.forEach(itemText => addItemToTodoList(itemText));
    completedItems.forEach(itemText => addItemToCompletedList(itemText));
}
