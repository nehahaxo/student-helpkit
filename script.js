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
  
  // Get today's date and reset time to 00:00:00 for an accurate day-to-day comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  assignments.forEach((assignment, index) => {
    const li = document.createElement("li");
    li.classList.add("assignment-item");

    // Convert the stored due date string (YYYY-MM-DD) into a comparable Date object
    const dueDateObj = new Date(assignment.dueDate);
    // Set time to midnight to ensure we are strictly comparing calendar dates
    dueDateObj.setHours(24, 0, 0, 0); 

    let statusText = assignment.status;
    let statusClass = "";

    // 1. Determine base status color classes
    if (assignment.status === "Not Started") statusClass = "status-red";
    if (assignment.status === "Ongoing") statusClass = "status-yellow";
    if (assignment.status === "Submitted") statusClass = "status-green";

    // 2. Overdue Check: If the due date is strictly BEFORE today, and it hasn't been submitted
    if (dueDateObj < today && assignment.status !== "Submitted") {
      statusClass = "status-overdue"; // Override class for visual styling (e.g., flashing dark red)
      statusText = "Overdue";         // Explicitly display "Overdue" to the user
    }

    // Dynamic Action Button based on status
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
        <small class="status ${statusClass}">Status: ${statusText}</small>
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

  // Empty fields check
  if (name === "" || dueDate === "") {
    alert("Please enter assignment name and due date!");
    return;
  }

  // Duplicate Check: Prevents adding an assignment with the exact same name
  const isDuplicate = assignments.some(assign => assign.name.toLowerCase() === name.toLowerCase());
  if (isDuplicate) {
    alert("An assignment with this name already exists!");
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