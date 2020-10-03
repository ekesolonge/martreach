// Get from local storage
users = JSON.parse(localStorage.getItem("database"));

originalUsers = JSON.parse(localStorage.getItem("database"));

// Creates new storage if none exists
if (users == null) {
  users = [];
}

// Click event to add more users
document.querySelector(".addBtn").addEventListener("click", () => {
  newObj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    role: document.getElementById("role").value,
    pics: document.getElementById("pics").value.split("\\")[2],
  };

  if (
    newObj.firstName != "" &&
    newObj.lastName != "" &&
    newObj.email != "" &&
    newObj.username != "" &&
    newObj.role != "" &&
    newObj.pics != ""
  ) {
    users.push(newObj);

    // Empty text box
    empty();
  }

  // Adds it to local storage
  localStorage.setItem("database", JSON.stringify(users));

  display();
});

// Display Content in HTML
function display() {
  cont = "";

  for (i = 0; i < users.length; i++) {
    cont += `
            <div class="profile"> 
            <div class="item">               
            <img src= "${users[i].pics}" style= "max-height: 100px"><br>
            </div>
            <div class="item">
            <strong>First Name</strong> : ${users[i].firstName}<br>
            </div>
            <div class="item">
            <strong>Last Name</strong> : ${users[i].lastName}<br>
            </div>
            <div class="item">
            <strong>Email</strong> : ${users[i].email}<br>
            </div>
            <div class="item">
            <strong>Username</strong> : ${users[i].username}<br>
            </div>
            <div class="item">
            <strong>Role</strong> : ${users[i].role}<br>
            </div>
            <div class="item">
            <button class = "delBtn" onclick="del(${i})">Delete</button>
            <button class = "editBtn" onclick="edit(${i})">Edit</button>
            </div>
         </div>`;
  }
  document.getElementById("main").innerHTML = cont;
}

display();

// Function to Delete
function del(id) {
  originalIndex = originalUsers.findIndex(
    (x) => x.username == users[id].username
  );

  con = confirm(`Are you sure you want to delete ${users[id].username}?`);
  if (con == true) {
    originalUsers.splice(originalIndex, 1);

    users = originalUsers;
    localStorage.setItem("database", JSON.stringify(originalUsers));
    display();
  }
}

// Function to Edit
function edit(id) {
  editUser = users[id];
  originalIndex = originalUsers.findIndex(
    (x) => x.username == editUser.username
  );
  document.getElementById("firstName").value = editUser.firstName;
  document.getElementById("lastName").value = editUser.lastName;
  document.getElementById("email").value = editUser.email;
  document.getElementById("username").value = editUser.username;
  document.getElementById("role").value = editUser.role;
  document.getElementById("pics").value.split("\\")[2] = editUser.pics;
  document.getElementById("index").value = originalIndex;
}

// Function to Update
function update() {
  i = document.getElementById("index").value;

  let updatedRecord = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    role: document.getElementById("role").value,
    pics: document.getElementById("pics").value.split("\\")[2],
  };
  originalUsers[i] = updatedRecord;
  users = originalUsers;
  localStorage.setItem("database", JSON.stringify(originalUsers));
  display();

  // Empty text box
  empty();
}

// Search
function search() {
  // Search box
  param = document.getElementById("search").value.toLowerCase();

  // Filter
  users = users.filter((element) =>
    element.username.toLowerCase().includes(param)
  );

  if (users == null || users == undefined || users.length == 0) {
    alert("No record found for " + param);
  } else {
    display();
  }

  users.length == 1
    ? (document.getElementById("searchResult").innerHTML =
        users.length + " record found")
    : (document.getElementById("searchResult").innerHTML =
        users.length + " records found");

  // display cancel button
  document.querySelector(".cancel").style.display = "block";
}

// Cancel Search
function cancelSearch() {
  // Get from local storage
  users = JSON.parse(localStorage.getItem("database"));

  // Display Content in HTML
  display();

  // hide cancel button
  document.querySelector(".cancel").style.display = "none";

  // Empty search box
  document.getElementById("search").value = "";
  document.getElementById("searchResult").innerHTML = "";
}

// Empty text boxes
function empty() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("role").value = "";
  document.getElementById("pics").value.split("\\")[2] = "";
}