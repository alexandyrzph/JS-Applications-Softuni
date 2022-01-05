function loadRepos() {
	const repoId = document.getElementById('username').value;
	const reposUl = document.getElementById(`repos`);
	reposUl.replaceChildren();
	fetch(`https://api.github.com/users/${repoId}/repos/`)
		.then(res => res.json())
		.then(data => {
			for (const key in data) {
				
				const liElement = document.createElement('li');
				const repoName = document.createElement('a');
				repoName.textContent = `${data[key].full_name}`; 
				repoName.href = `${data[key].html_url}`;
				
				liElement.appendChild(repoName);
				reposUl.appendChild(liElement);
			};
		})
}