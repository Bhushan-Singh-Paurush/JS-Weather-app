let your_weather=document.querySelector("[your_weather]");
let search_weather=document.querySelector("[search_weather]");
let grant_access=document.querySelector("[grant_access]");
let tempature=document.querySelector("[tempature]");
let search=document.querySelector("[search]");
let search_input=document.querySelector('input');
let search_button=document.querySelector("[search_button]");
let loading_image=document.querySelector("[loading_image]");
let error=document.querySelector("[error]");
let city_not_found=document.querySelector("[city_not_found]");
let grant_access_button=document.querySelector("[grant_access_button]");

let my_city=document.querySelector("[my_city]");
let my_city_ico=document.querySelector("[my_city_ico]");
let my_weather=document.querySelector("[my_weather]");
let my_weather_icon=document.querySelector("[my_weather_icon]");
let my_tempature=document.querySelector("[my_tempature]");
let windspeed=document.querySelector("[windspeed]");
let humidity=document.querySelector("[humidity]");
let clouds=document.querySelector("[clouds]");

let lat=null;
let lon=null;
let API_key='cb9def827e8d2f91daaa09f298c46756';
first();
function first()
{
    tempature.classList.add('hidden');    
    your_weather.classList.add('bg-gray-400');
    grant_access.classList.remove('hidden');
}
grant_access_button.addEventListener('click',()=>{
    getgeolocation();
})

search_weather.addEventListener('click',()=>{
    your_weather.classList.remove('bg-gray-400');
    search_weather.classList.add('bg-gray-400');
    grant_access.classList.add('hidden');
    tempature.classList.add('hidden');
    search.classList.remove('hidden')
    error.classList.add('hidden')
})

your_weather.addEventListener('click',()=>{
    search_weather.classList.remove('bg-gray-400');
    your_weather.classList.add('bg-gray-400');
    search.classList.add('hidden');
    error.classList.add('hidden')
    if(lat==null && lon==null)
        first();
    else
    intermediate2();
})

search_button.addEventListener('click',()=>{
    intermediate1(search_input.value);
})
async function intermediate1(city) {
    loading_image.classList.remove('hidden');
    try{
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
    let data=await response.json();

    display(data);
    }
    catch{

    }
}
async function getgeolocation() {
    if(navigator.geolocation)
    {
        try
        {await navigator.geolocation.getCurrentPosition(setlocation);}
        catch
        {
            alert("Server error");
        }
    }
    else
    {
            alert("Geolocation not found");
    }
}
function setlocation(values)
{
        lat=values.coords.latitude;
        lon=values.coords.longitude;
        intermediate2(lat,lon);
        console.log("set location");
}
async function intermediate2() {
    grant_access.classList.add('hidden');
    loading_image.classList.remove('hidden');
    try{
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    let data=await response.json();
    display(data);
    }
    catch{

    }
}
function display(data) {
    if(data?.cod==404)
    {
        loading_image.classList.add('hidden');
        error.classList.remove('hidden');
        city_not_found.textContent=data?.message;
        return;
    }
    else
    {
   
        error.classList.add('hidden');    
    my_city.textContent=data?.name;
    my_city_ico.src=`https://flagsapi.com/${data?.sys?.country}/flat/64.png`;
    my_tempature.textContent=`${parseInt((data?.main?.temp) - 273)}°C`;
    my_weather_icon.src=`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;
    my_weather.textContent=data?.weather?.[0]?.main;
    windspeed.textContent=`${data?.wind?.speed}m/s`;
    humidity.textContent=`${data?.main?.humidity}%`;
    clouds.textContent=`${data?.clouds?.all}%`;
    loading_image.classList.add('hidden');
    search.classList.add('hidden');
    tempature.classList.remove('hidden');
    }
}