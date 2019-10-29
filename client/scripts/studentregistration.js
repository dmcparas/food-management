document.getElementById("student-form").onsubmit = function(evt){
    
    let firstName = document.getElementById("inputName1").value;
    let lastName = document.getElementById("inputName2").value;
    let name = firstName + " " + lastName;
    let usn = document.getElementById("usn").value;
    let userName = document.getElementById("userName").value;
    let passWord = document.getElementById("password").value;
    let data = {
        "name": name,
        "usn": usn,
        "username": userName,
        "password": passWord
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/studentsignup", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            console.log(this.getAllResponseHeaders())
        }
    };
    xhttp.setRequestHeader("Content-type", "application/json");
    var x = xhttp.send(JSON.stringify(data));
    evt.preventDefault();
}