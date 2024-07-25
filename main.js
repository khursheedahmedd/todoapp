document.getElementById('add').addEventListener('click', function () {
    const itemText = document.getElementById('item').value;
    const itemDescription = document.getElementById('description').value;
    if (itemText !== '' && itemDescription !== '') {
        addItemToTodoList(itemText, itemDescription);
        saveToLocalStorage();
        document.getElementById('item').value = '';
        document.getElementById('description').value = '';
    }
});

window.addEventListener('load', function () {
    loadFromLocalStorage();
});

function addItemToTodoList(itemText, itemDescription) {
    const todoList = document.getElementById('todo');
    const listItem = document.createElement('li');
    listItem.className = 'flex flex-col bg-white p-4 border border-gray-300 rounded mb-2 shadow';

    const title = document.createElement('span');
    title.className = 'font-bold';
    title.textContent = itemText;
    listItem.appendChild(title);

    const description = document.createElement('span');
    description.className = 'text-gray-600';
    description.textContent = itemDescription;
    listItem.appendChild(description);

    const buttons = document.createElement('div');
    buttons.className = 'mt-2 flex justify-end';

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 ml-2';
    completeButton.addEventListener('click', function () {
        listItem.remove();
        addItemToCompletedList(itemText, itemDescription);
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

function addItemToCompletedList(itemText, itemDescription) {
    const completedList = document.getElementById('completed');
    const listItem = document.createElement('li');
    listItem.className = 'flex flex-col bg-gray-200 p-4 border border-gray-300 rounded mb-2 shadow';

    const title = document.createElement('span');
    title.className = 'font-bold';
    title.textContent = itemText;
    listItem.appendChild(title);

    const description = document.createElement('span');
    description.className = 'text-gray-600';
    description.textContent = itemDescription;
    listItem.appendChild(description);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2 mt-2 self-end';
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

    document.querySelectorAll('#todo li').forEach(item => {
        const title = item.querySelector('span:nth-child(1)').textContent;
        const description = item.querySelector('span:nth-child(2)').textContent;
        todoItems.push({ title, description });
    });

    document.querySelectorAll('#completed li').forEach(item => {
        const title = item.querySelector('span:nth-child(1)').textContent;
        const description = item.querySelector('span:nth-child(2)').textContent;
        completedItems.push({ title, description });
    });

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
}

function loadFromLocalStorage() {
    const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    const completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];

    todoItems.forEach(item => addItemToTodoList(item.title, item.description));
    completedItems.forEach(item => addItemToCompletedList(item.title, item.description));
}
