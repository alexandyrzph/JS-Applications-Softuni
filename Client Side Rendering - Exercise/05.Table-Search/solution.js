import { html, render } from "./node_modules/lit-html/lit-html.js";

// creating the student template
const studentRow = (student) => html`
<tr class=${student.match ? 'select' : ''}>
	<td>${student.item.firstName} ${student.item.lastName}</td>
	<td>${student.item.email}</td>
	<td>${student.item.course}</td>
</tr>`;

// declaring global scoper variable that will be reasigned with the student data from the REST Service

const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);

let students;
// invoke fn start to load all students rows
start();

async function start() {
	const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
	// we reasign the data with the data from the server
	const data = await res.json();
	students = Object.values(data).map(s => ({ item: s, match: false }));
	// and invoking the update function to visualize the changes
	update();
}

function update() {
	// data must be Array thats why we called Object.values
	// so we can map the lit-html template
	render(students.map(studentRow), document.querySelector('tbody'));
}


function onSearch() {
	const value = input.value.trim().toLocaleLowerCase();
	for (let student of students) {
		student.match = Object.values(student.item).some(v => v.toLocaleLowerCase().trim().includes(value));
	}

	update();
}