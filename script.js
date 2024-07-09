document.addEventListener("DOMContentLoaded", function() {
    const workerForm = document.getElementById("workerForm");
    const workerTableBody = document.getElementById("workerTableBody");

    workerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const password = document.getElementById("password").value;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${fullName}</td>
            <td>${email}</td>
            <td>${contactNumber}</td>
            <td>${password}</td>
            <td><button class="btn edit-btn"><i class="fa-regular fa-pen-to-square"></i></button></td>
            <td><button class="btn delete-btn"><i class="fa-regular fa-trash-can" style="color: red;"></i></button></td>
        `;
        workerTableBody.appendChild(newRow);

        // Clear the form fields
        workerForm.reset();

        // Close the modal
        const addWorkerModal = bootstrap.Modal.getInstance(document.getElementById("addWorkerModal"));
        addWorkerModal.hide();

        // Attach event listeners to the new buttons
        attachEventListeners();
    });

    function attachEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.removeEventListener("click", editWorker);
            button.addEventListener("click", editWorker);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.removeEventListener("click", deleteWorker);
            button.addEventListener("click", deleteWorker);
        });
    }

    function editWorker() {
        const row = this.closest("tr");
        const fullName = row.children[0].textContent;
        const email = row.children[1].textContent;
        const contactNumber = row.children[2].textContent;
        const password = row.children[3].textContent;

        // Fill the form with existing values
        document.getElementById("fullName").value = fullName;
        document.getElementById("email").value = email;
        document.getElementById("contactNumber").value = contactNumber;
        document.getElementById("password").value = password;

        // Remove the current row
        row.remove();

        // Show the modal
        const addWorkerModal = new bootstrap.Modal(document.getElementById("addWorkerModal"));
        addWorkerModal.show();
    }

    function deleteWorker() {
        const row = this.closest("tr");
        row.remove();
    }

    // Initial attach of event listeners
    attachEventListeners();
});