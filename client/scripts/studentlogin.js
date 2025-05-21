document.getElementById("create-account-student").onclick = function () {
    location.href = "../pages/StudentRegistration.html";
};

document.getElementById("login-student").onsubmit = function(evt){
    let userName = document.getElementById("student-username").value;
    if(userName == "")
    alert("Please enter username");
    let password = document.getElementById("student-password").value;
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
            location.href = "../pages/Menu.html";
        }
        else {
            if(this.responseText != "" && this.readyState == 4)
            alert(this.responseText);
            evt.preventDefault();
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/studentlogin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
}