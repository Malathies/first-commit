let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const search = document.getElementById("search");

function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

function displayJobs(filter = "") {
    jobList.innerHTML = "";

    const filteredJobs = jobs.filter(job =>
        job.company.toLowerCase().includes(filter.toLowerCase()) ||
        job.role.toLowerCase().includes(filter.toLowerCase())
    );

    filteredJobs.forEach(job => {
        const row = document.createElement("tr");

        const companyCell = document.createElement("td");
        companyCell.textContent = job.company;

        const roleCell = document.createElement("td");
        roleCell.textContent = job.role;

        const statusCell = document.createElement("td");
        statusCell.textContent = job.status;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            jobs = jobs.filter(item => item.id !== job.id);
            saveJobs();
            displayJobs(search.value);
        });

        actionCell.appendChild(deleteButton);

        row.append(companyCell, roleCell, statusCell, actionCell);
        jobList.appendChild(row);
    });

    document.getElementById("total").textContent = jobs.length;

    document.getElementById("interviews").textContent =
        jobs.filter(job => job.status === "Interview").length;

    document.getElementById("selected").textContent =
        jobs.filter(job => job.status === "Selected").length;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const status = document.getElementById("status").value;

    if (!company || !role) {
        alert("Please fill all fields");
        return;
    }

    jobs.push({
        id: Date.now(),
        company: company,
        role: role,
        status: status
    });

    saveJobs();
    form.reset();
    displayJobs(search.value);

    alert("Job application added successfully!");
});

search.addEventListener("input", function() {
    displayJobs(this.value);
});

displayJobs();