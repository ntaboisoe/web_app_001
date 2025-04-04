document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const localStorageKey = 'todoList';

    // Load tasks from local storage
    function loadTasks() {
        const storedTasks = localStorage.getItem(localStorageKey);
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => addTaskToDOM(task));
        }
    }

    // Save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }

    // Add a task to the DOM
    function addTaskToDOM(taskText) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(listItem);

        const deleteButton = listItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            listItem.remove();
            updateLocalStorage();
        });
    }

    // Handle adding a new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            updateLocalStorage();
            taskInput.value = '';
        }
    });

    // Update local storage with the current tasks in the DOM
    function updateLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll('.task-text');
        taskElements.forEach(taskElement => {
            tasks.push(taskElement.textContent);
        });
        saveTasks(tasks);
    }

    // Initial load of tasks
    loadTasks();
});
