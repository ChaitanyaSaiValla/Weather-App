const index = document.querySelector(".index"),
    inputsection = index.querySelector(".input-section"),
    infoT = inputsection.querySelector(".info"),
    inputfield = inputsection.querySelector("input"),
    locationbtn = inputsection.querySelector("button"),
    wicon = index.querySelector(".weather-section img"),
    arrow = index.querySelector("header i");

let api;
inputfield.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputfield.value != "") {
        requestApi(inputfield.value);
    }
});

locationbtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert("Your Browser doesn't support Geolocation Api ");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=22c79945635ee907423fb71d0576cb63`;
    fetchdata();
}

function onError(error) {
    infoT.innerText = error.message;
    infoT.classList.add("error");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=22c79945635ee907423fb71d0576cb63`;
    fetchdata();
}
function fetchdata() {
    infoT.innerText = "Fetching Details...";
    infoT.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherdetails(result));
}

function weatherdetails(info) {
    infoT.classList.replace("pending", "error");
    if (info.cod == "404") {
        infoT.innerText = `${inputfield.value} is Not found`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;
        const { speed } = info.wind;
        if (id == 800) {
            wicon.src = "Weather Icons/clear.svg";
        } else if (id >= 200 && id <= 232) {
            wicon.src = "Weather Icons/storm.svg";
        } else if (id >= 600 && id <= 622) {
            wicon.src = "Weather Icons/snow.svg";
        } else if (id >= 701 && id <= 781) {
            wicon.src = "Weather Icons/haze.svg";
        } else if (id >= 801 && id <= 804) {
            wicon.src = "Weather Icons/cloud.svg";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wicon.src = "Weather Icons/rain.svg";
        }
        index.querySelector(".temperature .num").innerText = temp;
        index.querySelector(".weather").innerText = description;
        index.querySelector(".location span").innerText = `${city}, ${country}`;
        index.querySelector(".temperature .num-2").innerText = feels_like;
        index.querySelector(".humidity span").innerText = `${humidity}%`;
        index.querySelector(".wind span").innerText = `${speed}m/s`;

        infoT.classList.remove("pending", "error");
        index.classList.add("active");
    }

}
arrow.addEventListener("click", () => {
    index.classList.remove("active");
})