const URI0 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const URI1 = "&lon=";
const URI2 = "&exclude=";
const URI3 = "&appid=";
const key = "685354582625e442598f81c4a7cb87fa";
const memphis = [35.1155, -89.971107];

//API call to convert a place name into coordinates
function getPlace(name){
    fetch("https://us1.locationiq.com/v1/search.php?key=pk.fcd964496e14a7a4d399c539c6637d97&q="+name+"&format=json").then((res) => {
        return res.json();
    }).then((data)=> {
        //toDo: add an alert when an invalid city is entered.
        getWeather(data[0].boundingbox.slice(1,3), data[0].display_name);
    })
}

//API call to fetch the weather at given coordinates
function getWeather(coords, name){
    fetch(URI0+coords[0]+URI1+coords[1]+URI2+"minutely"+URI3+key+"&units=imperial").then((res) => {
        console.log(res);
        return res.json();
    }).then((data)=> {
        console.log(data);
        for(let i=0; i<8; i++){
            document.getElementById("cityName").innerText = name
            document.getElementById("current").innerText = data.current.temp;
            document.getElementById("feelsLike").innerText = data.current.feels_like;
            document.getElementById("day"+i).innerText = data.daily[i].temp.max + "°f";
        }
    })
}

//Event listener for the main text box
document.getElementById("textBox").addEventListener("keyup", function(e){
    if(e.key === "Enter"){
        let loc = document.getElementById("textBox").value;
        document.getElementById("textBox").value = "";
        getPlace(loc);
    }
})

