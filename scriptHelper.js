// Write your helper functions here!

require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let missonObjective = document.getElementById('missionTarget');
   missonObjective.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
                `;
};

function validateInput(testInput) {
    let numInput= Number(testInput);
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(numInput)) {
        return "Not a Number";
    } else if (isNaN(numInput)=== false) {
        return "Is a Number";
    }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let cargoStatus = document.getElementById('cargoStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let copilotStatus = document.getElementById('copilotStatus');

   if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || 
   validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
       alert ('All fields are required');
   } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
       alert('Please enter numerical values for Fuel Level and Cargo Mass');
   } else if (validateInput(pilot)==='Is a Number'||validateInput(copilot)==='Is a Number') {
       alert('Please do not enter numbers for name of pilot or co-pilot');
   } 
   else {
       list.style.visibility = 'visible';
pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
let launchStatus = document.getElementById("launchStatus");

if (fuelLevel < 10000 && cargoLevel <= 10000) {
    fuelStatus.innerHTML = 'Fuel level too low for launch';
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = "#C7254E";
   } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
    cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = "#C7254E";
   } else if (fuelLevel < 10000 && cargoLevel > 10000) {
    cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
    fuelStatus.innerHTML = 'Fuel level too low for launch';
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = "#C7254E";
   }
    else {
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    launchStatus.innerHTML = 'Shuttle is Ready for Launch';
    launchStatus.style.color = "#419F6A";
   }
}
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if (response.status >= 400) {
            throw new Error ("Bad response");
        }
        else {
        return response.json() 
        }
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let location = Math.floor(Math.random()* planets.length);
    return planets[location];
}
// is this breaking my code with my return statment outside the function??
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
