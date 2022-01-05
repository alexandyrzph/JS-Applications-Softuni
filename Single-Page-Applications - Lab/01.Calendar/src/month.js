export function showMonths(e) {
    const id = `year-${e.target.innerText}`;
    e.target.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    document.getElementById(id).style.display = 'block';
}