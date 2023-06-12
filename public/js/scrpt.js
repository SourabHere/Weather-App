var fetchW = "/weather";

const weather = document.querySelector('form');
const search = document.querySelector('input');
const condition = document.querySelector('.condition');
const temp = document.querySelector('.temp');
const loc = document.querySelector('.location');

weather.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(search.value);

    loc.textContent = "loading...";
    temp.textContent = "";
    condition.textContent = "";
    const locationApi = fetchW + "?address=" + search.value;
    fetch(locationApi).then(response =>{
        // console.log(response);
        response.json().then(data =>{
            if(data.error){
                loc.textContent = data.error;
                temp.textContent = "";
                condition.textContent = "";
            }
            else{
                loc.textContent = data.cityName;
                temp.textContent = data.temperature;
                condition.textContent = data.description;
            }
        })
    })
})