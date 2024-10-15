// Form elements
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

// Event listener for form submission
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addStudent();
});

window.onload = function () {
    displayStudents();
};

// Add Student
function addStudent() {
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    if (!validateInput(name, id, email, contact)) return;

    const student = {
        name: name,
        id: id,
        email: email,
        contact: contact,
    };

    const students = getStudentsFromStorage();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
    clearForm();
}

// Display Students
function displayStudents() {
    const students = getStudentsFromStorage();
    studentList.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

// Edit Student
function editStudent(index) {
    const students = getStudentsFromStorage();
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    deleteStudent(index); // Remove old entry before updating
}

// Delete Student
function deleteStudent(index) {
    const students = getStudentsFromStorage();
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
}

// Validate Inputs
function validateInput(name, id, email, contact) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name || !isNaN(name)) {
        alert("Invalid name. Please enter letters only.");
        return false;
    }

    if (!id || isNaN(id)) {
        alert("Invalid student ID. Please enter numbers only.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Invalid email address.");
        return false;
    }

    if (!contact || isNaN(contact)) {
        alert("Invalid contact number. Please enter numbers only.");
        return false;
    }

    return true;
}

// Clear Form
function clearForm() {
    studentForm.reset();
}

// Get Students from Local Storage
function getStudentsFromStorage() {
    const students = localStorage.getItem('students');
    return students ? JSON.parse(students) : [];
}
