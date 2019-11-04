document.getElementById("create-account-messincharge").onclick = function () {
    location.href = "../pages/MessIn-ChargeRegistration.html";
};

document.getElementById("messincharge-login").onsubmit = function(evt){
    let userName = document.getElementById("mess-username").value;
    if(userName == "")
    alert("Please enter username");
    let password = document.getElementById("mess-password").value;
    if(password == "")
    alert("Please enter password");
    let data = {
        "username": userName,
        "password": password
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
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/messinchargelogin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
}