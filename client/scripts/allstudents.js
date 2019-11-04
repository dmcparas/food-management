document.getElementById("student-food").onsubmit = function(evt){
    var xhttp = new XMLHttpRequest();
    var getdate = document.getElementById("data-date").value;
    var data = {"date":getdate};
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tabledata").innerHTML = "";
            let receivedData = JSON.parse(this.responseText);
            let innerData = "";
            let count =1;
            for(let i=0;i<receivedData[0].details.length;i++){
                let name = receivedData[0].details[i].studentusn.name;
                let usn = receivedData[0].details[i].studentusn.usn;
                let breakfast = receivedData[0].details[i].breakfast ? 'YES' : 'NO';
                let lunch = receivedData[0].details[i].lunch ? 'YES' : 'NO';
                let dinner = receivedData[0].details[i].dinner ? 'YES' : 'NO';
                innerData = innerData+ "<tr><th scope=\"row\">"+count+"</th><td>"+name+"</td><td>"+usn+"</td><td>"+breakfast+"</td><td>"+lunch+"</td><td>"+dinner+"</td></tr>";
                count++;
            }
            document.getElementById("tabledata").innerHTML = innerData;
        }
        else {
            if(this.responseText != "" && this.readyState == 4)
            alert("No details found for selected date");
            evt.preventDefault();
        }
    };
    xhttp.open("POST", "http://localhost:4000/api/foodmanagement/getfooddetailsforwarden", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-auth",localStorage.getItem("token"));
    xhttp.send(JSON.stringify(data));
};