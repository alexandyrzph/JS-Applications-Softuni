function solve() {
    let info = document.getElementsByClassName('info')[0];
    
    let stop = {
        next: 'depot'
    }
    
    
    async function depart(e) {
        document.getElementById('depart').disabled = true;


        const req = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);
        stop = await req.json();

        info.textContent = `Next stop ${stop.name}`;

        document.getElementById('arrive').disabled = false;
    }

    function arrive() {
        info.textContent = `Arriving at ${stop.name}`;
        
        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;


    }

    return {
        depart,
        arrive,
    };
}

let result = solve();