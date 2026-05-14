let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

const assignmentNameInput = document.getElementById("assignmentName");
const dueDateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const assignmentList = document.getElementById("assignmentList");

// Function to display assignments
function displayAssignments() {
  assignmentList.innerHTML = "";

  assignments.forEach((assignment, index) => {
    const li = document.createElement("li");
    li.classList.add("assignment-item");

    li.innerHTML = `
      <span><b>${assignment.name}</b> (Due: ${assignment.dueDate})</span>
      <button class="delete-btn" onclick="deleteAssignment(${index})">Delete</button>
    `;

    assignmentList.appendChild(li);
  });

  localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Function to add assignment
addBtn.addEventListener("click", () => {
  const name = assignmentNameInput.value.trim();
  const dueDate = dueDateInput.value;

  if (name === "" || dueDate === "") {
    alert("Please enter assignment name and due date!");
    return;
  }

  assignments.push({ name: name, dueDate: dueDate });

  assignmentNameInput.value = "";
  dueDateInput.value = "";

  displayAssignments();
});

// Function to delete assignment
function deleteAssignment(index) {
  assignments.splice(index, 1);
  displayAssignments();
}

// Load assignments when page opens
displayAssignments();