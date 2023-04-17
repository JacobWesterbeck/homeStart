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
    document.getElementById("clock").innerHTML = hour + ":" + minute + ":" + second + " " + ampm;

    document.getElementById("message").innerHTML = message
}
setInterval(clock, 1000);