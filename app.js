window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree      = document.querySelector('.temperature-degree');
    let timezoneLocation       = document.querySelector('.timezone-location');
    let degreeSection          = document.querySelector('.degree-section');
    let degreeSpan             = document.querySelector('.degree-section span');

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            
            long = position.coords.longitude;
            lat  = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            let myKey = "a1fd0337efdabfc77432bb7566663861";
            const api = `${proxy}https://api.darksky.net/forecast/${myKey}/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const { temperature, summary, icon } = data.currently;

                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    timezoneLocation.textContent = data.timezone;

                    //Set Icon 
                    setIcons(icon, document.querySelector('.icon'));

                    //Formule Celsius to Farenheit
                    let celsius = (temperature - 32) * (5/9);

                    //Change Temperature to Celsius/Farenheit
                    degreeSection.addEventListener("click", ()=>{

                        if(degreeSpan.textContent === "F"){
                            degreeSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
        });
    }

    function setIcons(icon, iconID){

        const skycons     = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});