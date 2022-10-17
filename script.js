// Write your JavaScript code here!
// not fetching scipt?? 
const { addDestinationInfo, formSubmission } = require("./scriptHelper");
const { myFetch } = require("/scriptHelper");

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let newPlanet = pickPlanet (listedPlanets);
       addDestinationInfo(document, newPlanet.name, newPlanet.diameter, newPlanet.star, newPlanet.distance, newPlanet.moons, newPlanet.imageUrl);
   })
   let list = document.getElementById("faultyItems");
   list.style.visibiltity = "hidden";
   let form = document.querySelector('form');
form.addEventListener('submit',function(event){
    event.preventDefault();
    // preventDefault()??

    let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;

    formSubmission(document, list, copilot, fuelLevel, cargoLevel);

});
   
});