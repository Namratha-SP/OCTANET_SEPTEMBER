document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load saved tasks from local storage
    loadTasks();

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(todoInput.value);
        todoInput.value = '';
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            deleteTask(e.target.parentElement);
        } else if (e.target.classList.contains('edit-btn')) {
            editTask(e.target.parentElement);
        } else if (e.target.tagName === 'LI') {
            toggleComplete(e.target);
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        saveTasks();
    }

    function deleteTask(taskElement) {
        taskElement.remove();
        saveTasks();
    }

    function toggleComplete(taskElement) {
        taskElement.classList.toggle('completed');
        saveTasks();
    }

    function editTask(taskElement) {
        const currentTask = taskElement.firstChild.textContent;
        const newTask = prompt('Edit your task:', currentTask);
        if (newTask !== null && newTask.trim() !== '') {
            taskElement.firstChild.textContent = newTask;
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(taskElement => {
            tasks.push({
                text: taskElement.firstChild.textContent,
                completed: taskElement.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            li.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
});
