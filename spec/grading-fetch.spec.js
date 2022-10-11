// THIS FILE IS BEING USED BY THE AUTOGRADER. DO NOT EDIT IT IN ANY WAY

var studentFunctions = require('../scriptHelper.js');
const path = require('path');
const fs = require('fs');

const studentPlanet = studentFunctions.pickPlanet.toString();

const planetsResponse = [
   {
      "name": "Tatooine",
      "diameter": "10465 km",
      "star": "Tatoo I & Tatoo II",
      "distance": "43000 light years from galactic core",
      "image": "https://www.nasa.gov/sites/default/files/images/587837main_Kepler16_transit_art2_full.jpg",
      "moons": 3
   },
   {
       "name": "Pern",
       "diameter": "measurement is under dispute",
       "star": "Alpha Sagittarius (a.k.a. Rukbat)",
       "distance": "Varies - find a library",
       "image": "https://www.nasa.gov/centers/langley/images/content/698148main_Brains_904_2.jpg",
       "moons": 2
   },
   {
       "name": "Saturn/Titan",
       "diameter": "5149.5 km",
       "star": "Sol",
       "distance": "1.4 billion km from Earth",
       "image": "https://solarsystem.nasa.gov/system/resources/detail_files/16278_PIA20016.jpg",
       "moons": 0
   },
   {
       "name": "Mars",
       "diameter": "6779 km",
       "star": "Sol",
       "distance": "225 million km from Earth",
       "image": "https://mars.nasa.gov/system/resources/detail_files/7808_global-color-views-mars-PIA00407-full2.jpg",
       "moons": 2
   },
   {
       "name": "K2-18b",
       "diameter": "34500 km",
       "star": "K2-18",
       "distance": "110 light years from Earth",
       "image": "https://www.nasa.gov/sites/default/files/thumbnails/image/heic1916a.jpg",
       "moons": "unknown"
   },
   {
       "name": "Jupiter/Europa",
       "diameter": "3,121.6 km",
       "star": "Sol",
       "distance": "628.3 million km from Earth",
       "image": "https://apod.nasa.gov/apod/image/1609/Europa_Galileo_960.jpg",
       "moons": 0
   }
 ];

let script = fs.readFileSync(path.resolve(__dirname, "../script.js"), 'utf8');

describe("GRADING FETCH CALL TEST: ", function () {

   it("Student is fetching list of planets", async function() {
      const result = await studentFunctions.myFetch();
      expect(result).toEqual(planetsResponse);
   })

   it("Student selects planet at random", function() {
       expect(studentPlanet.includes("Math.random()")).toBeTrue;
       expect(planetsResponse.includes(studentFunctions.pickPlanet(planetsResponse))).toBeTrue();
   })

   it("Student calls addDestinationInfo inside script", function() {
      expect(script.includes("addDestinationInfo(")).toBeTrue;
   })
})