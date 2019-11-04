document.getElementById("mess-form").onsubmit = function(evt){
    
    let userName = document.getElementById("userName").value;
    if(userName == "")
    alert("Please enter username");
    let passWord = document.getElementById("password").value;
    if(passWord == "")
    alert("Please enter password");
    let data = {
        "username": userName,
        "password": passWord
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let receivedData = JSON.parse(this.responseText);
            localStorage.setItem("userId",receivedData.userId);
            localStorage.setItem("token",receivedData.token);
            location.href = "../pages/FoodCount.html";
        }
        else {
            if(this.responseText != "" && this.readyState == 4)
            alert(this.responseText);
            evt.preventDefault();
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/messinchargesignup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    
}