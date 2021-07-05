import appkey from './env.js';
const curDate = document.getElementById("date");
const searchIcon = document.getElementById("searchIcon");
const searchForm = document.querySelector('form');
let searchQuery = '';


searchForm.addEventListener('submit', (e) => {
e.preventDefault();
searchQuery = e.target.querySelector('input').value;
console.log(searchQuery)
load();
}) 
searchIcon.addEventListener('submit', (e) => {
e.preventDefault();
searchQuery = e.target.querySelector('input').value;
console.log(searchQuery)
load();
}) 


 

const getcurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};

const getcurrentTime = () => {
  var months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let period = "AM";

  if (hours > 11) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${month} ${date} | ${hours}:${minutes} ${period}`;
};

curDate.innerHTML = getcurrentDay() + " | " + getcurrentTime();


let weathercon = document.getElementById("weathercon");
async function load(){

    let temp = document.getElementById("temp");
    let tempmax = document.getElementById("tempmax");
    let tempmin = document.getElementById("tempmin");
    let location = document.getElementById('location');
    

      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${appkey}`;
     const response = await fetch(url);
     const data = await response.json();
     const arrData = [data];

    //  city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`; a16b6eae3525420f8a894f7845aad06f
     temp.innerHTML = arrData[0].main.temp;
     tempmax.innerText = arrData[0].main.temp_max;
     tempmin.innerText = arrData[0].main.temp_min;

     const tempStatus = arrData[0].weather[0].main;

     location.innerText = `${arrData[0].name} | ${arrData[0].sys.country}`

if(tempStatus == "Sunny"){
      weathercon.innerHTML = "<i class = 'fas fa-sun' style = 'color: #eccc68;'> </i> "
  }
  else if(tempStatus == "Clouds"){
      weathercon.innerHTML = "<i class = 'fas fa-cloud' style = 'color: #f1f2f6;'> </i> "
  }
  else if(tempStatus == "Rainy"){
      weathercon.innerHTML = "<i class = 'fas fa-sun' style = 'color: #a4b0be;'> </i> "
  }
  else {
      weathercon.innerHTML = "<i class = 'fas fa-sun' style = 'color: yellow;'> </i> "
  }

}