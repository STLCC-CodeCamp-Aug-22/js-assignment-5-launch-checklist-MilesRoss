// THIS FILE IS BEING USED BY THE AUTOGRADER. DO NOT EDIT IT IN ANY WAY

var screen = require('@testing-library/dom');
var JasmineDOM = require('@testing-library/jasmine-dom');
var studentFunctions = require('../scriptHelper.js');
require('isomorphic-fetch');

// Set up JSDom
const fs = require('fs');
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options = {
   resources: "usable",
   runScripts: "dangerously"
}

let html = fs.readFileSync(path.resolve(__dirname, "../index.html"), 'utf8');
let helperScript = fs.readFileSync(path.resolve(__dirname, "../scriptHelper.js"), "utf8");
let script = fs.readFileSync(path.resolve(__dirname, "../script.js"), 'utf8');

describe ("GRADING DOM MANIPULATION TEST: ", function () {

   let window, container, list, h2, pilotStatus, copilotStatus, fuelStatus, cargoStatus, missionTarget; 

   beforeAll(async function() {

      const dom = await JSDOM.fromFile(path.resolve(__dirname, "../index.html"), options).then(dom => window = dom.window);

      // let scriptElement = window.document.createElement("script");
      // scriptElement.textContent = script;
      // window.document.head.appendChild(scriptElement);

      await new Promise (resolve => {
        window.addEventListener('load', resolve);
          container = dom.window.document.body;
          list = screen.getByTestId(container, "faultyItems");
          h2 = screen.getByTestId(container, "launchStatus");
          pilotStatus = screen.getByTestId(container, "pilotStatus");
          copilotStatus = screen.getByTestId(container, "copilotStatus");
          fuelStatus = screen.getByTestId(container, "fuelStatus");
          cargoStatus = screen.getByTestId(container, "cargoStatus");
          missionTarget = screen.getByTestId(container, "missionTarget");
      });
   });

   it ("Function properly validates text", function() {
      expect(studentFunctions.validateInput("")).toEqual("Empty");
      expect(studentFunctions.validateInput("asdf")).toEqual("Not a Number");
      expect(studentFunctions.validateInput("10")).toEqual("Is a Number");
   })

   it ("Launch CheckList is ready to go", function() {
      // Check page before form submission to make sure everything is working
     expect(list.style.visibility).toEqual("hidden"); 
     expect(pilotStatus.textContent).toEqual("Pilot Ready");
      expect(copilotStatus.textContent).toEqual("Co-pilot Ready");
      expect(fuelStatus.textContent).toEqual("Fuel level high enough for launch");
      expect(cargoStatus.textContent).toEqual("Cargo mass low enough for launch");

   })

   it ("Launch Checklist when fuel too low for launch", function() {
     // Shuttle should be not be ready for launch, fuel too low
     studentFunctions.formSubmission(window.document, list, "Chris", "Bob", 0, 5);
     expect(list.style.visibility).toEqual("visible");
     expect(h2.style.color).toEqual("rgb(199, 37, 78)");
     expect(h2.textContent).toEqual("Shuttle Not Ready for Launch");
     expect(pilotStatus.textContent).toEqual("Pilot Chris is ready for launch");
      expect(copilotStatus.textContent).toEqual("Co-pilot Bob is ready for launch");
     expect(fuelStatus.textContent).toEqual("Fuel level too low for launch");
     expect(cargoStatus.textContent).toEqual("Cargo mass low enough for launch");

   })

   it("Launch Checklist when cargo too heavy for launch", function() {
     // Shuttle should not be ready for launch, cargo too high
     studentFunctions.formSubmission(window.document, list, "Chris", "Bob", 10000, 100000);
     expect(list.style.visibility).toEqual("visible");
     expect(h2.style.color).toEqual("rgb(199, 37, 78)");
     expect(h2.textContent).toEqual("Shuttle Not Ready for Launch");
     expect(pilotStatus.textContent).toEqual("Pilot Chris is ready for launch");
      expect(copilotStatus.textContent).toEqual("Co-pilot Bob is ready for launch");
     expect(fuelStatus.textContent).toEqual("Fuel level high enough for launch");
     expect(cargoStatus.textContent).toEqual("Cargo mass too heavy for launch");

   })

   it("Launch Checklist when cargo too heavy and fuel too low for launch", function() {
     // Shuttle should not be ready for launch, cargo too high, fuel too low
     studentFunctions.formSubmission(window.document, list, "Chris", "Bob", 0, 100000);
     expect(list.style.visibility).toEqual("visible");
     expect(h2.style.color).toEqual("rgb(199, 37, 78)");
     expect(h2.textContent).toEqual("Shuttle Not Ready for Launch");
     expect(pilotStatus.textContent).toEqual("Pilot Chris is ready for launch");
      expect(copilotStatus.textContent).toEqual("Co-pilot Bob is ready for launch");
     expect(fuelStatus.textContent).toEqual("Fuel level too low for launch");
     expect(cargoStatus.textContent).toEqual("Cargo mass too heavy for launch");

   })

   it("Launch Checklist when everything is good to go", function() { 
     // Shuttle should be ready for launch, enough fuel and cargo
     studentFunctions.formSubmission(window.document, list, "Chris", "Bob", 10000, 1);
     expect(list.style.visibility).toEqual("visible");
     expect(h2.style.color).toEqual("rgb(65, 159, 106)");
     expect(h2.textContent).toEqual("Shuttle is Ready for Launch");
     expect(pilotStatus.textContent).toEqual("Pilot Chris is ready for launch");
      expect(copilotStatus.textContent).toEqual("Co-pilot Bob is ready for launch");
     expect(fuelStatus.textContent).toEqual("Fuel level high enough for launch");
     expect(cargoStatus.textContent).toEqual("Cargo mass low enough for launch");
   }) 

   it ("Mission target has the appropriate info", function() {
     let missionTarget = screen.getByTestId(window.document.body, "missionTarget");
     let testTarget = missionTarget.innerHTML.replace(/\s/g,'');
     expect(testTarget).toEqual("<!--Fetchsomeplanetarydata-->");
     studentFunctions.addDestinationInfo(window.document, "Saturn/Titan", "5149.5 km", "Sol", "1.4 billion km from Earth", "0", "https://solarsystem.nasa.gov/system/resources/detail_files/16278_PIA20016.jpg");
     testTarget = missionTarget.innerHTML.replace(/\s/g,'');
     expect(testTarget).toEqual('<h2>MissionDestination</h2><ol><li>Name:Saturn/Titan</li><li>Diameter:5149.5km</li><li>Star:Sol</li><li>DistancefromEarth:1.4billionkmfromEarth</li><li>NumberofMoons:0</li></ol><imgsrc="https://solarsystem.nasa.gov/system/resources/detail_files/16278_PIA20016.jpg">');
   })

   it ("Script contains calls to appropriate helper functions", function() {
     expect(script.includes("formSubmission(")).toBeTrue;
     expect(script.includes("myFetch(")).toBeTrue;
     expect(script.includes("pickPlanet(")).toBeTrue;
     expect(script.includes("addDestinatonInfo(")).toBeTrue;
   })
});