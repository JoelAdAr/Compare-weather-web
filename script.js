let weather = {
    apiKey: "5e145aaaae79e6fa13dc1d1b35ec1735",
    fetchWeather: function(cities) {
        const promises = cities.map(city => {
            return fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
            ).then(response => response.json());
        });
        
        return Promise.all(promises) 
            .catch(error => console.log("Error fetching weather data:", error));
    },
    
    
    

    displayWeather: function(data) {
        data.forEach((cityData, index) => {
            console.log("Weather data received for city " + (index + 1) + ":", cityData);
            if (!cityData || !cityData.weather || cityData.weather.length === 0) {
                console.error("Weather data for city " + (index + 1) + " is undefined or empty.");
                console.log("Temperature for city " + (index + 1) + ":", temp);
console.log("Weather description for city " + (index + 1) + ":", description);
                return;
            }

            const { name } = cityData;
            const { icon, description } = cityData.weather[0];
            const { temp, humidity } = cityData.main;
            const { speed } = cityData.wind;

            const cityElement = document.querySelector(".card-city" + (index + 1));
            cityElement.querySelector(".city").innerHTML = "Weather in: " + name;
            cityElement.querySelector(".temp").innerHTML = Math.round(temp) + "°C";
            cityElement.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            cityElement.querySelector(".description").innerHTML = description;
            cityElement.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
            cityElement.querySelector(".wind").innerHTML = "Wind speed: " + speed + " m/s";
        });
    },

    compareAndDisplay: function(city1Data, city2Data, city2Class) {
        const city1Temp = city1Data.main.temp;
        const city2Temp = city2Data.main.temp;
    
        const city2TempElement = document.querySelector(city2Class + " .temp");
    
        city2TempElement.innerHTML = Math.round(city2Temp) + "°C";
        console.log(city1Temp);

        if (city1Temp < city2Temp) {
            city2TempElement.style.color = "#FF4500"; 
            console.log(city2Class + ".temp : It arrives");
        } else if (city1Temp > city2Temp) {
            city2TempElement.style.color = "#87CEEB"; 
        } else {
            city2TempElement.style.color = "white"; 
        }
    },
    
    compareWeather: function() {
        const city1 = document.getElementById("city1").value.trim();
        const city2 = document.getElementById("city2").value.trim();
        if (!city1 || !city2) {
            console.error("Please enter both cities.");
            return;
        }
    
        this.fetchWeather([city1, city2])
            .then(data => {
                console.log("Weather data:", data); 
                if (data.length < 2 || !data[0] || !data[1]) {
                    console.error("Error fetching weather data for one or both cities.");
                    return;
                }
                
                this.displayWeather(data); 
                this.compareAndDisplay(data[0], data[1], ".card-city2"); 
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }
    
    
    
    
};

document.getElementById("compare-btn").addEventListener("click", function() {
    weather.compareWeather();
});
