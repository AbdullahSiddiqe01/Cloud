let s = document.querySelector(".megnify");
let txt = document.querySelector(".h1-text");
let inp = document.querySelector(".search");
let hdt = document.querySelector(".hum-h2");
let wnd = document.querySelector(".wind-h2");
let tempra = document.querySelector(".main-h1");
let img = document.querySelector(".mid-img");
let state = document.querySelector(".state");

async function checkWeather(city){

    const key = "e62f5ed3ecdf40cdb4a7f69f1b003d04";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    let weatherData = await axios.get(`${url}`);
    console.dir(weatherData);

    txt.innerText = weatherData.data.name;
    hdt.innerText = `${weatherData.data.main.humidity} %`;

    let spd = Math.round(weatherData.data.wind.speed * 3.6);
    wnd.innerText = `${spd} KM/Hr`;

    let dry = Math.round(weatherData.data.main.temp - 273.2);
    tempra.innerText = `${dry}°C`;

    let imgchng = weatherData.data.weather[0].main;
    
    if(imgchng == 'Haze'){
        img.src = "drizzle.png";
    }else if(imgchng == 'Clear'){
        img.src = "clear.png";
    }else if(imgchng == 'Clouds'){
        img.src = "clouds.png";
    }else if(imgchng == 'Rain'){
        img.src = "rain.png";
    }else if(imgchng == 'Mist'){
        img.src = "mist.png";
    }
}


s.addEventListener("click", ()=>{
    checkWeather(inp.value);
    inp.value = "";
});

function isOnline(){
    return navigator.onLine;
}

if(isOnline()){
    state.innerHTML = `<div class="online">Back Online</div>`;
    setInterval(()=>{
        state.style.opacity = 0;
    },2000);
} else{
    state.innerHTML = `<div class="offline">Oops! you are offline</div>`;
}