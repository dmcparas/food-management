
document.getElementById("menu-date").onchange = function(evt){
    var today = new Date();
    var selectedDate = new Date(document.getElementById("menu-date").value);
    selectedDate.setHours(21);
    var todayMonth = today.getMonth()+1;
    if(selectedDate.getTime() < today.getTime()){
        alert("Please select date equal to or after "+today.getDate()+"-"+todayMonth+"-"+today.getFullYear());
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let receivedData = JSON.parse(this.responseText);
            if(receivedData.breakfast == true)
            document.getElementById("breakfast-yes").checked = true;
            else if(receivedData.breakfast == false)
            document.getElementById("breakfast-no").checked = true;
            if(receivedData.lunch == true)
            document.getElementById("lunch-yes").checked = true;
            else if(receivedData.lunch == false)
            document.getElementById("lunch-no").checked = true;
            if(receivedData.dinner == true)
            document.getElementById("dinner-yes").checked = true;
            else if(receivedData.dinner == false)
            document.getElementById("dinner-no").checked = true;
            document.getElementById("menu-form").removeEventListener("submit",saveFunction);
            document.getElementById("menu-form").addEventListener("submit",updateFunction);
        }
        else {
            document.getElementById("menu-form").removeEventListener("submit",updateFunction);
            document.getElementById("menu-form").addEventListener("submit",saveFunction);
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/getfooddetails", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("x-auth",localStorage.getItem("token"));
    xhttp.send(JSON.stringify({userId:localStorage.getItem("userId"),date:document.getElementById("menu-date").value}));
    }
}

var saveFunction = function(evt){
    
    let breakfast = document.querySelector('.breakfast:checked').value;
    let lunch = document.querySelector('.lunch:checked').value;
    let dinner = document.querySelector('.dinner:checked').value;

    let data = {
        "date": document.getElementById("menu-date").value,
        "userId": localStorage.getItem("userId"),
        "breakfast": breakfast,
        "lunch": lunch,
        "dinner": dinner
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Success");
            document.getElementById("menu-form").removeEventListener("submit",saveFunction);
            document.getElementById("menu-form").addEventListener("submit",updateFunction);
        }
        else {
            if(this.responseText != "" && this.readyState == 4)
            alert(this.responseText);
            evt.preventDefault();
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/savefooddetails", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("x-auth",localStorage.getItem("token"));
    xhttp.send(JSON.stringify(data));
    
}

var updateFunction = function(evt){
    let breakfast = document.querySelector('.breakfast:checked').value;
    let lunch = document.querySelector('.lunch:checked').value;
    let dinner = document.querySelector('.dinner:checked').value;

    let data = {
        "date": document.getElementById("menu-date").value,
        "userId": localStorage.getItem("userId"),
        "breakfast": breakfast,
        "lunch": lunch,
        "dinner": dinner
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Success");
        }
        else {
            if(this.responseText != "" && this.readyState == 4)
            alert(this.responseText);
            evt.preventDefault();
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/updatefooddetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-auth",localStorage.getItem("token"));
    xhttp.send(JSON.stringify(data));
}