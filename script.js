let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

const assignmentNameInput = document.getElementById("assignmentName");
const dueDateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const assignmentList = document.getElementById("assignmentList");

// Save assignments to localStorage
function saveAssignments() {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Display assignments on screen
function displayAssignments() {
  assignmentList.innerHTML = "";

  assignments.forEach((assignment, index) => {
    const li = document.createElement("li");
    li.classList.add("assignment-item");

    let statusClass = "";
    if (assignment.status === "Not Started") statusClass = "status-red";
    if (assignment.status === "Ongoing") statusClass = "status-yellow";
    if (assignment.status === "Submitted") statusClass = "status-green";

    let actionButton = "";
    if (assignment.status === "Not Started") {
      actionButton = `<button class="start-btn" onclick="updateStatus(${index})">Start</button>`;
    } else if (assignment.status === "Ongoing") {
      actionButton = `<button class="finish-btn" onclick="updateStatus(${index})">Finish</button>`;
    }

    li.innerHTML = `
      <div>
        <span><b>${assignment.name}</b></span><br>
        <small>Due: ${assignment.dueDate}</small><br>
        <small class="status ${statusClass}">Status: ${assignment.status}</small>
      </div>

      <div class="btn-group">
        ${actionButton}
        <button class="delete-btn" onclick="deleteAssignment(${index})">Delete</button>
      </div>
    `;

    assignmentList.appendChild(li);
  });

  saveAssignments();
}

// Add assignment
addBtn.addEventListener("click", () => {
  const name = assignmentNameInput.value.trim();
  const dueDate = dueDateInput.value;

  if (name === "" || dueDate === "") {
    alert("Please enter assignment name and due date!");
    return;
  }

  assignments.push({
    name: name,
    dueDate: dueDate,
    status: "Not Started"
  });

  assignmentNameInput.value = "";
  dueDateInput.value = "";

  displayAssignments();
});

// Update assignment status
function updateStatus(index) {
  const currentStatus = assignments[index].status;

  if (currentStatus === "Not Started") {
    assignments[index].status = "Ongoing";
  } else if (currentStatus === "Ongoing") {
    assignments[index].status = "Submitted";
  }

  displayAssignments();
}

// Delete assignment
function deleteAssignment(index) {
  assignments.splice(index, 1);
  displayAssignments();
}

// Load assignments when page opens
displayAssignments();
