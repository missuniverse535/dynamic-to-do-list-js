// Setup Event listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // 1. Initialize and Load Tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            // Create task without saving to localStorage (to avoid duplication)
            createTaskElement(taskText, false);
        });
    }
    
    // Function to create task element
    function createTaskElement(taskText, saveToStorage = true) {
        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Assign onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            // Update Local Storage after removal
            updateLocalStorage();
        };
        
        // Append elements
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // Save to Local Storage if needed
        if (saveToStorage) {
            updateLocalStorage();
        }
    }
    
    // Function to update Local Storage
    function updateLocalStorage() {
        const tasks = [];
        // Get all tasks from DOM (excluding "Remove" button text)
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach(item => {
            const taskText = item.textContent.replace('Remove', '').trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // 2. Modified addTask function with Local Storage
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();
        
        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Create task and save to Local Storage
        createTaskElement(taskText, true);
        
        // Clear the task input field
        taskInput.value = '';
        taskInput.focus();
    }
    
    // 3. Task removal already handled in createTaskElement function
    
    // Attach Event Listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Load tasks from Local Storage when page loads
    loadTasks();
});
