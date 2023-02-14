
const searchAirportsInTheCity = document.querySelector("#searchAirportsInTheCity");

const searchAirportsInTheCityButton = document.querySelector("#searchAirportsInTheCityButton");

const flightType = document.querySelector("#flightType");

const departureDate = document.querySelector("#departureDate");

const returnDate =document.querySelector("#returnDate");

const departureAirport = document.querySelector("#departureAirport");

const arrivalAirport = document.querySelector("#arrivalAirport");

const submitFlightDetails = document.querySelector("#submitFlightDetails");

const flightsContainer = document.querySelector(".flightsContainer");


function flightApiRequest(url) {


    const flightApiDetails = new Promise ((resolve,reject)=>{

        const flightXhttpRequest = new XMLHttpRequest();

        flightXhttpRequest.open("get",`https://api.flightapi.io/${url}`);

        flightXhttpRequest.onload= function (){

            if (flightXhttpRequest.status==200) {

                resolve(JSON.parse(flightXhttpRequest.response));
                
            }
            else{

                reject(flightXhttpRequest.status);

            }
        }

        flightXhttpRequest.send();
    })


        return  flightApiDetails;
    
}


searchAirportsInTheCityButton.addEventListener("click",getCityAirportsNearBy);


async function getCityAirportsNearBy() {

    let airportsNearBy = await flightApiRequest(`nearby/639793cba42e97f348f3771e?country=${searchAirportsInTheCity.value}&token=dHA9MCNsb2M9MzUxNTQyMTkjbG5nPTMzI3BsPTIjhfjdsfk5MzQxI2xicz0xNDoxNjcwNTczMQ==`);

    airportsNearBy = airportsNearBy[`Nearby Airports`];

    flightsContainer.innerHTML="";

    for (let i = 0; i < airportsNearBy.length; i++) {

        let airportContainer = document.createElement("div");

        airportContainer.innerHTML=airportsNearBy[i].Airport+"<br><br>"+airportsNearBy[i].Code+"<br><br>"+airportsNearBy[i].Title+"<br><br><br><br>"
        
        airportContainer.style.cssText=`
        
        width:50vw;
        margin:10px auto;
        text-align: center;
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;`
        console.log(airportsNearBy.Nearby_Airports);

        flightsContainer.appendChild(airportContainer);
        
    }

        
    console.log(airportsNearBy[`Nearby Airports`]);
    
}


submitFlightDetails.addEventListener("click",getFlights);

async function getFlights(){

    flightsContainer.innerHTML="";

    if (flightType.value=="oneDirection") {

        let oneWayFlights = await flightApiRequest(`onewaytrip/639793cba42e97f348f3771e/${departureAirport.value}/${arrivalAirport.value}/${departureDate.value}/1/0/0/Economy/USD`)

        console.log(oneWayFlights);

        oneWayFlights.fares.map((flight)=>{

            let stopsIndex = oneWayFlights.legs.findIndex((legs)=>{
            return legs.id ==oneWayFlights.trips[oneWayFlights.trips.findIndex((trip)=>
            {
                
            return trip.id== flight.tripId
                
            })].legIds[0];
            }); 

            let flightContainer = document.createElement("div");
            let website = document.createElement("h1");
            let price = document.createElement("h2");
            let flightId = document.createElement("p");
            let perchesNow = document.createElement("a");
            let perchesButton = document.createElement("button");
            website.innerText=`${flight.providerCode}`;
            price.innerText = `${flight.price.totalAmount}$`;
            flightId.innerText=`Number of stops : ${oneWayFlights.legs[stopsIndex].segments.length-1} \n Flight duration : ${oneWayFlights.legs[stopsIndex].duration} \n Departure time from ${departureAirport.value} : ${oneWayFlights.legs[stopsIndex].departureTime} \n Arrival time to ${arrivalAirport.value} :  ${oneWayFlights.legs[stopsIndex].arrivalTime}\n Trip id : ${flight.tripId}`;
            perchesNow.href=`${flight.handoffUrl}`;
            perchesButton.innerText=`Perches now`
            perchesNow.appendChild(perchesButton);
            flightContainer.style.cssText=
            `margin: 10px auto;
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: auto auto;
            column-gap: 5px;
            text-align: center;
            width: 50vw;
            padding: 3px;
            border-radius: 10px;
            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;`;

            price.style.cssText=`color: blue;
            align-self: end;`

            perchesNow.style.cssText=` height:70%;
            align-self: end;`

            perchesButton.style.cssText=`border: solid darkblue 1px;
            border-radius: 5px;
            background-color: whitesmoke;
            height: 100%;
            width:100%;
            color: blue;`;

            flightContainer.appendChild(website);
            flightContainer.appendChild(price);
            flightContainer.appendChild(flightId);
            flightContainer.appendChild(perchesNow);
            flightsContainer.appendChild(flightContainer);
            flightsContainer.style.display="block";

        })
    }

    if (flightType.value=="towDirections") {
        let roundTripFlights = await flightApiRequest(`roundtrip/639793cba42e97f348f3771e/${departureAirport.value}/${arrivalAirport.value}/${departureDate.value}/${returnDate.value}/1/0/0/Economy/USD`)

        console.log(roundTripFlights);


        roundTripFlights.fares.map((flight)=>{


            let stopsIndex = roundTripFlights.legs.findIndex((legs)=>{
            return legs.id ==roundTripFlights.trips[roundTripFlights.trips.findIndex((trip)=>
            {
                
            return trip.id== flight.tripId
                
            })].legIds[0];
            }); 

            let flightContainer = document.createElement("div");
            let website = document.createElement("h1");
            let price = document.createElement("h2");
            let flightId = document.createElement("p");
            let perchesNow = document.createElement("a");
            let perchesButton = document.createElement("button");
            website.innerText=`${flight.providerCode}`;
            price.innerText = `${flight.price.totalAmount}$`;
            flightId.innerText=`Number of stops : ${roundTripFlights.legs[stopsIndex].segments.length-1} \n Flight duration : ${roundTripFlights.legs[stopsIndex].duration} \n Departure time from ${departureAirport.value} : ${roundTripFlights.legs[stopsIndex].departureTime} \n Arrival time to ${arrivalAirport.value} :  ${roundTripFlights.legs[stopsIndex].arrivalTime}\n Trip id : ${flight.tripId}`;
            perchesNow.href=`${flight.handoffUrl}`;
            perchesButton.innerText=`Perches now`
            perchesNow.appendChild(perchesButton);
            flightContainer.style.cssText=
            `margin: 10px auto;
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: auto auto;
            column-gap: 5px;
            text-align: center;
            width: 50vw;
            padding: 3px;
            border-radius: 10px;
            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;`;

            price.style.cssText=`color: blue;
            align-self: end;`

            perchesNow.style.cssText=` height:70%;
            align-self: end;`

            perchesButton.style.cssText=`border: solid darkblue 1px;
            border-radius: 5px;
            background-color: whitesmoke;
            width:100%;
            height: 100%;
            color: blue;`;

            flightContainer.appendChild(website);
            flightContainer.appendChild(price);
            flightContainer.appendChild(flightId);
            flightContainer.appendChild(perchesNow);
            flightsContainer.appendChild(flightContainer);
            flightsContainer.style.display="block";

        })
    }
}




