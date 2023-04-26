




function tdlist(){
    const  itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) :
    []

    console.log(itemsArray)

    document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
    })

    function displayItems(){
    let items = ""
    for(let i = 0; i < itemsArray.length; i++){
        items += `  <div class="item">
                        <div class="input-controller">
                            <textarea disabled>${itemsArray[i]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-trash deleteBtn"></i>
                            </div>
                        </div>
                    </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    }

    function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
    }

    function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i) })
    })
    }

    function deleteItem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
    }

    window.onload = function() {
    displayItems()
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
    const date = new Date();
    let currentDays = document.querySelector(".days"); //days of the current month

    date.setDate(1); //set the day to the 1st of the month -- just to initialize a day to grab some info and store in variables below

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
        "December",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()]; //display current month 
    document.querySelector(".date p").innerHTML = new Date().toDateString(); //generate current date as a string

    let days = ""; //create the variable days as an empty string

    for(let j = firstWeekday; j > 0; j--){
        days += `<div class="before-days">${prevLastDay - j + 1}</div>`;
    }

    for(let i = 1; i<= lastDay; i++){ 
        if(i === today){
            days += `<div class="today">${i}</div>`; 
        }
        else{
        days +=`<div>${i}</div>`;//template literals(double backticks) treat everything between them as a string. ${} will denote everything between the brackets as javeascipt. The days divs in my html will be created dynamically by this loop
        }
    }   
    currentDays.innerHTML = days;

    for(let k = 1; k <= afterDays; k++) {
        days += `<div class="after-days">${k}</div>`;
    }
    currentDays.innerHTML = days;
}
calendar();