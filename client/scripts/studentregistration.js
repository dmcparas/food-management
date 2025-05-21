document.getElementById("student-form").onsubmit = function(evt){
    
    let firstName = document.getElementById("inputName1").value;
    if(firstName == "")
    alert("Please enter first name");
    let lastName = document.getElementById("inputName2").value;
    if(lastName == "")
    alert("Please enter last name");
    let name = firstName + " " + lastName;
    let usn = document.getElementById("usn").value;
    if(usn == "")
    alert("Please enter usn");
    let userName = document.getElementById("userName").value;
    if(userName == "")
    alert("Please enter username");
    let passWord = document.getElementById("password").value;
    if(passWord == "")
    alert("Please enter password");
    let data = {
        "name": name,
        "usn": usn,
        "username": userName,
        "password": passWord
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
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/studentsignup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    
}