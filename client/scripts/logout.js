document.getElementById("log-out").onclick = function(evt){
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    location.href = "../index.html";
}