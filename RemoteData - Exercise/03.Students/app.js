const url = `http://localhost:3030/jsonstore/collections/students`;
const tbody = document.querySelector('tbody');
const form = document.getElementById('form');
form.addEventListener('submit', createStudent);



async function getStudents() {
    const request = await fetch(url);
    const response = await request.json();
    return Object.values(response);
}

async function loadStudents() {
    const students = await getStudents(url);
    students.forEach(s => {
        const trElement = document.createElement('tr');
        const firstNameTh = document.createElement('th');
        firstNameTh.textContent = `${s.firstName}`;
        const lastNameTh = document.createElement('th');
        lastNameTh.textContent = `${s.lastName}`;
        const facultyNumberTh = document.createElement('th');
        facultyNumberTh.textContent = `${s.facultyNumber}`;
        const gradeTh = document.createElement('th');
        gradeTh.textContent = `${s.grade.toFixed(2)}`;
        trElement.appendChild(firstNameTh);
        trElement.appendChild(lastNameTh);
        trElement.appendChild(facultyNumberTh);
        trElement.appendChild(gradeTh);
        tbody.appendChild(trElement);
    });
}
loadStudents();

async function createStudent(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const grade = Number(formData.get('grade'));
    const facultyNumber = Number(formData.get('facultyNumber'));
    const student = { firstName, lastName, grade, facultyNumber }

    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    };
    const req = await fetch(url, options);

    const res = await req.json();
    tbody.replaceChildren();
    loadStudents();
    return res;
}