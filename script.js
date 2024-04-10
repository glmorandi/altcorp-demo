document.addEventListener('DOMContentLoaded', function() {
    // Load problems from local storage when the page loads
    loadProblems();
    
    // Add event listener for the add form
    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get form values
        var title = document.getElementById('title').value;
        var description = document.getElementById('description').value;
        var recommendation = document.getElementById('recommendation').value;
        
        // Add problem to local storage
        addProblem(title, description, recommendation);
        
        // Clear form fields
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('recommendation').value = '';
        
        // Reload problems
        loadProblems();
    });
});

// Function to add a problem to local storage
function addProblem(title, description, recommendation) {
    var problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.push({ title: title, description: description, recommendation: recommendation });
    localStorage.setItem('problems', JSON.stringify(problems));
}

// Function to load problems from local storage and display them
function loadProblems() {
    var problems = JSON.parse(localStorage.getItem('problems')) || [];
    var problemList = document.getElementById('problemList');
    problemList.innerHTML = ''; // Clear existing list
    
    problems.forEach(function(problem, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${problem.title}</strong><br>
            <em>${problem.description}</em><br>
            <span>${problem.recommendation}</span><br>
            <button onclick="editProblem(${index})">Edit</button>
            <button onclick="deleteProblem(${index})">Delete</button>
        `;
        problemList.appendChild(listItem);
    });
}

// Function to clear search input and reload all problems
function clearSearch() {
    document.getElementById('searchInput').value = ''; // Clear search input
    loadProblems(); // Reload all problems
}

// Function to delete a problem from local storage
function deleteProblem(index) {
    var problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.splice(index, 1);
    localStorage.setItem('problems', JSON.stringify(problems));
    loadProblems(); // Reload problems
}

var editingIndex = null; // Initialize editing index variable

// Function to edit a problem
function editProblem(index) {
    // Check if an edit is already in progress
    if (editingIndex !== null) {
        alert("Please save or cancel the current edit before editing another problem.");
        return; // Exit the function if an edit is already in progress
    }

    // Show edit buttons, hide add button
    document.getElementById('editButtons').style.display = 'block';
    document.getElementById('addButton').style.display = 'none';

    var problems = JSON.parse(localStorage.getItem('problems')) || [];
    var problem = problems[index];
    
    // Populate form fields with problem data
    document.getElementById('title').value = problem.title;
    document.getElementById('description').value = problem.description;
    document.getElementById('recommendation').value = problem.recommendation;
    
    // Set editingIndex to the current index
    editingIndex = index;
}

// Function to save the edited problem
function saveEditedProblem() {
    // Get form values
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var recommendation = document.getElementById('recommendation').value;
    
    // Get problems from local storage
    var problems = JSON.parse(localStorage.getItem('problems')) || [];
    
    // Update the problem at editingIndex
    problems[editingIndex] = { title: title, description: description, recommendation: recommendation };
    
    // Save updated problems to local storage
    localStorage.setItem('problems', JSON.stringify(problems));
    
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('recommendation').value = '';
    
    // Reset editingIndex to null
    editingIndex = null;
    
    // Hide edit buttons, show add button
    document.getElementById('editButtons').style.display = 'none';
    document.getElementById('addButton').style.display = 'block';
    
    // Reload problems
    loadProblems();
}

// Function to cancel editing
function cancelEdit() {
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('recommendation').value = '';
    
    // Reset editingIndex to null
    editingIndex = null;
    
    // Hide edit buttons, show add button
    document.getElementById('editButtons').style.display = 'none';
    document.getElementById('addButton').style.display = 'block';
}

// Function to search problems by title, description, or recommendation
function searchProblems() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var problems = JSON.parse(localStorage.getItem('problems')) || [];
    var filteredProblems = problems.filter(function(problem) {
        return (
            problem.title.toLowerCase().includes(searchInput) ||
            problem.description.toLowerCase().includes(searchInput) ||
            problem.recommendation.toLowerCase().includes(searchInput)
        );
    });
    var problemList = document.getElementById('problemList');
    problemList.innerHTML = ''; // Clear existing list
    
    filteredProblems.forEach(function(problem, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${problem.title}</strong><br>
            <em>${problem.description}</em><br>
            <span>${problem.recommendation}</span><br>
            <button onclick="editProblem(${index})">Edit</button>
            <button onclick="deleteProblem(${index})">Delete</button>
        `;
        problemList.appendChild(listItem);
    });
}

// Function to generate and add random problems
function generateRandomProblems() {
    var titles = ['Patologia 1', 'Patologia 2', 'Patologia 3'];
    var descriptions = ['Descrição 1', 'Descrição 2', 'Descrição 3'];
    var recommendations = ['Recomendação 1', 'Recomendação 2', 'Recomendação 3'];
    
    titles.forEach(function(title, index) {
        addProblem(title, descriptions[index], recommendations[index]);
    });
    
    loadProblems(); // Reload problems
}

// Function to delete all problems
function deleteAllProblems() {
    localStorage.removeItem('problems');
    loadProblems(); // Reload problems (which will be empty)
}