const mainForecast = document.getElementById("forecast");

const currentForecast = document.getElementById("current");
const upcomingForecast = document.getElementById("upcoming");
const inputField = document.getElementById("location");
const getWeatherBtn = document.getElementById("submit");
const weathers = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
};
const url = `http://localhost:3030/jsonstore/forecaster/locations`;

function attachEvents() {
    getWeatherBtn.addEventListener("click", getWeather);
}

attachEvents();

async function getWeather(ev) {
    if (inputField.value.trim() == "") {
        alert("Please add correct location!");
        return;
    }

    console.log();

    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            throw new Error("Error!");
        }
        const response = await request.json();
        const locationFound = response.find((loc) => loc.name == inputField.value);
        if (locationFound == undefined) throw new Error("Wrong location");

        const currentTempRequest = await fetch(
            `http://localhost:3030/jsonstore/forecaster/today/${locationFound.code}`
        );
        const currentTempResponse = await currentTempRequest.json();
        console.log(currentTempResponse);

        const threeDayTempRequest = await fetch(
            `http://localhost:3030/jsonstore/forecaster/upcoming/${locationFound.code}`
        );
        const threeDayTempResponse = await threeDayTempRequest.json();
        console.log(threeDayTempResponse);

        mainForecast.style.display = "block";
    } catch (err) {
        alert(err);

    }
}
