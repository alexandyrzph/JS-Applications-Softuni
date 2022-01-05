async function getInfo() {

    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        
        stopNameElement.textContent = 'Loading...';
        timeTableElement.replaceChildren();

        const req = await fetch(url);
        if (req.status !== 200) throw new Error('ID not Found');
        const res = await req.json();

        stopNameElement.textContent = res.name;
        Object.entries(res.buses).forEach(el => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${el[0]} arrives in ${el[1]} minutes`;
            timeTableElement.appendChild(liElement);
        });


    } catch (error) {
        stopNameElement.textContent = 'Error!';
    }
}