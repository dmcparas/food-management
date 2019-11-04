document.getElementById("food-count").onsubmit = function(evt){
    var xhttp = new XMLHttpRequest();
    var getdate = document.getElementById("count-date").value;
    var data = {"date":getdate};
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let receivedData = JSON.parse(this.responseText);
            console.log(receivedData);
            document.getElementById("breakfast").value = receivedData.breakfast;
            document.getElementById("lunch").value = receivedData.lunch;
            document.getElementById("dinner").value = receivedData.dinner;
        }
        else {
            if(this.responseText != "" && this.readyState == 4)
            alert("No details found for selected date");
            evt.preventDefault();
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/getfooddetailsformess", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-auth",localStorage.getItem("token"));
    xhttp.send(JSON.stringify(data));
};