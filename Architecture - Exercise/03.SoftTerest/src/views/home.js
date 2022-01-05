const section = document.getElementById('homePage');
section.remove();


section.querySelector('#getStartedLink').addEventListener('click', (event) => {
	event.preventDefault();
	ctx.goTo('catalog');
});

let ctx = null;

// this function start first 
export async function showHomePage(ctxTarget) {
	ctx = ctxTarget;
	ctx.showSection(section);
}