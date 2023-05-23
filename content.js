function appWeather() {

    const currentWeather =  document.querySelector(".current-weather");
    const weatherForecast = document.querySelector(".weather-forecast");
    

    getWeather();
    function getWeather() {
        //grab user location
        navigator.geolocation.getCurrentPosition((success) => {  

            //plug location info and API key from config file into API call url
            let {latitude, longitude} = success.coords;  
            const API_key = config.API_KEY;
            const  url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_key}`;  
            weatherData();
            //use fetch method to make the API call and pass data through to the renderWeather function
            async function weatherData() {  
                const response = await fetch(url);
                const data = await response.json();
                renderWeather(data);
            }   
        })
    }

    function renderWeather(data) {

        //create array of weekdays and grab current day as a number 0-6
        const week = [   
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
        ];

        const d = new Date();
        let currentDay = week[d.getDay()];  

        //initialize forecast variable to use as storage for weather data  
        let forecast = '';   

        data.daily.forEach((day, i) => {     
            //0 is the current day so this will only happen once, so i did not need to create a placeholder variable for this 
            if(i == 0){  
                currentWeather.innerHTML = `
                        <div class="today-forecast">
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="icon">
                            <div class="today-info">
                                <div class="weather-day">${currentDay}</div>
                                <div class="weather-data">
                                    <div class="temp"> High - ${Math.round(day.temp.max)}&#176;F</div>
                                    <div class="temp">Low - ${Math.round(day.temp.min)}&#176;F</div>
                                    <div class="humidity">Humidity - ${Math.round(day.humidity)}%</div>
                                    <div class="pop">Rain - ${Math.round(day.pop)}%</div>
                                </div>
                            </div>
                        </div>
                        `
            }else {  
                //as the forEach method looks through the array provided by the weather API, "i" will have values 1 through 6 each containing forecast data retrieved below and dynamically create html using template literals.
                forecast += `
                    <div class="forecast-item">
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="icon">
                        <div class="forecast-day">${week[new Date(day.dt * 1000).getDay()]}</div> 
                        <div class="temp"> High - ${Math.round(day.temp.max)}&#176;F</div>
                        <div class="temp">Low - ${Math.round(day.temp.min)}&#176;F</div>
                    </div>
                ` 
            }//for forecast-day i used the UTC time provided by the API. Had to multiply that value by 1000 bc unix timestamp is given in seconds and the Date object takes an input of milliseconds
        })
        //set the weatherForecast variable equal to the string of html(stored in "forecast") created above
        weatherForecast.innerHTML = forecast; 
    }
}
appWeather();

function tdlist(){

    //itemsArray is equal to the items in localstorage(JSON strings) : if nothing in localstorage, then it is an empty array
    const tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [] 
    
    //event listener for my task input field and submit button
    document.querySelector("#enter").addEventListener("click", () => {  
        const task = document.querySelector("#task-input")
        createTask(task);
    })

    function displayTasks(){   

        //placeholder variable to hold my html i will create as a string
        let tasks = ""; 

        for(let i = 0; i < tasksArray.length; i++){  
            tasks += `  
                <div class="task">
                    <div class="task-text">${tasksArray[i]}</div>
                    <i class="fa-solid fa-trash deleteBtn"></i>
                </div>
                `
        }
        //set the html created above equal to the html of my to do list and activate delete buttons
        document.querySelector(".to-do-list").innerHTML = tasks; 
        deleteListeners(); 
    }

    function createTask(task){  
        //push method adds a new item to the end of tasksArray
        tasksArray.push(task.value);  

        //set the value of tasks equal to the new array 
        localStorage.setItem("tasks", JSON.stringify(tasksArray)); 

        //reload the page to render updated to-do list
        location.reload(); 
    }

    function deleteListeners(){

        let deleteBtn = document.querySelectorAll(".deleteBtn")

        //db is what the current deletebtn will be called(since there can be multiple) at the "i"th position
        deleteBtn.forEach((db, i) => { 

            //each delete button is given an event listener that will run the deleteTask function upon being clicked. the i is passed through so deleteTask knows which item to remove from the array
            db.addEventListener("click", () => { deleteTask(i) }) 

        }) 
    }

    function deleteTask(i){

        //at i position, remove 1 element
        tasksArray.splice(i, 1)  

        //now tasks is set equal to the new array minus the deleted tasks
        localStorage.setItem("tasks", JSON.stringify(tasksArray)) 

        //reload the page to render updated to-do list
        location.reload() 
    }

    window.onload = function() {
        displayTasks();
    }
}
tdlist();

function clock(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let ampm;
    let message;

    //Determine  if AM or PM
    if(hour >= 12){
        ampm = "PM";
    }else{
        ampm = "AM";
    }

    //Set Message based on time of day
    if (hour < 12){
        message = "Good Morning!";
    }
    if (hour >= 12){
        message = "Good Afternoon!";
    }
    if (hour >= 18){
        message = "Good Evening";
    }

    //Make clock 12 hrs and add 0 before single digits
    if (hour > 12){
        hour = hour - 12;
    }

    if (hour < 10){
        hour = "0" + hour;
    }
    if (minute < 10){
        minute = "0" + minute;
    }
    if (second < 10){
        second = "0" + second;
    }

    //Choose the element on my dom and set its inner html to the time and corresponding message
    document.getElementById("item1").innerHTML = hour + ":" + minute + ":" + second + " " + ampm;

    document.getElementById("item2").innerHTML = message
}
setInterval(clock, 1000);

function calendar() {
    let currentDays = document.querySelector(".days"); 
    const date = new Date();
    date.setDate(1); 
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //input of 0 gets me the last day of the previous month, adding a +1 to .getmonth means i get last day of the current month
    let today = new Date().getDate();
    let prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // removing the +1 gets me the day before the first day of the current month - so this will be last day of previous month
    let firstWeekday = date.getDay(); //the day of the week denoted as a 0 - 6 - this gets me what the first day of the month will be since I setDate to 1
    let lastWeekday = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay(); 
    let afterDays = 7 - lastWeekday - 1; //this will get me the number of days left in the current week that are NOT in the current month

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()]; //display current month 
    document.querySelector(".date p").innerHTML = new Date().toDateString(); //generate current date as a string

    //create the variable days as an empty string to store html
    let days = ""; 

    //final days of the previous month starting from the final sunday of the previous month
    for(let j = firstWeekday; j > 0; j--){
        days += `<div class="before-days">${prevLastDay - j + 1}</div>`
    } 

    //all days of the current month, the if/else statement is to seperate the  current day out so I can style it differently on the page
    for(let i = 1; i<= lastDay; i++){ 
        if(i === today){
            days += `<div class="today">${i}</div>`
        }
        else{
        days +=`<div>${i}</div>`;
        }
    }   

    //first days of the next month ending at the first saturday of the next month
    for(let k = 1; k <= afterDays; k++) {
        days += `<div class="after-days">${k}</div>`
    }   

    //set my currentDays variable equal to the string of html stored in the days variable
    currentDays.innerHTML = days; 
}
calendar();