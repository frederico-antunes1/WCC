document.addEventListener('click', function(event) {
    // Close all dropdown menus if the click is outside of them
    if (!event.target.matches('.dropbtn')) {
        closeDropdowns();
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            } else if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
});

function selectOption(type, value) {
    event.preventDefault(); // Prevent the link from acting like a normal link
    if (type === 'difficulty') {
        document.getElementById('difficultyDropdown').querySelector('.dropbtn').textContent = value;
    } else if (type === 'category') {
        document.getElementById('categoryDropdown').querySelector('.dropbtn').textContent = value;
    }
    // Save the selection to localStorage
    localStorage.setItem(type, value);
    // Close the dropdown after selection
    closeDropdowns();
}

function closeDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.display = "none";
    }
}

// Start Game Button
document.getElementById('startCustomGame').addEventListener('click', function() {
    // Assuming you have a game logic setup, you can retrieve the settings like this:
    // var difficulty = localStorage.getItem('difficulty');
    // var category = localStorage.getItem('category');
    // Start the game with these settings...
    var difficulty = localStorage.getItem('difficulty');
    var category = localStorage.getItem('category');
    // For demonstration, we'll just redirect or log the settings
    console.log('Starting game with Difficulty:', localStorage.getItem('difficulty'), 'and Category:', localStorage.getItem('category'));
    // Redirect to your game page or start the game logic here
});

document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to dropdown buttons to toggle their dropdown content
    document.querySelectorAll('.dropbtn').forEach(function(button) {
        button.addEventListener('click', function() {
            var dropdownId = this.parentElement.id;
            toggleDropdownContent(dropdownId);
        });
    });

    // Start Game Button event listener
    document.getElementById('startCustomGame').addEventListener('click', function() {
        // Retrieve the settings from localStorage
        var difficulty = localStorage.getItem('difficulty');
        var category = localStorage.getItem('category');
        console.log('Starting game with Difficulty:', difficulty, 'and Category:', category);
        // Redirect to your game page or start the game logic here
    });
});

// Function to toggle the dropdown content visibility
function toggleDropdownContent(dropdownId) {
    var dropdownContent = document.getElementById(dropdownId).getElementsByClassName('dropdown-content')[0];
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Function to close all dropdowns
function closeDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.display = "none";
    }
}

// Global click event to close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        closeDropdowns();
    }
});

// Function to handle option selection from dropdowns
function selectOption(type, value) {
    event.preventDefault(); // Prevent the link from acting like a normal link
    if (type === 'difficulty') {
        document.getElementById('difficultyDropdown').querySelector('.dropbtn').textContent = value;
    } else if (type === 'category') {
        document.getElementById('categoryDropdown').querySelector('.dropbtn').textContent = value;
    }
    // Save the selection to localStorage
    localStorage.setItem(type, value);
    // Close the dropdown after selection
    closeDropdowns();
}
