document.getElementById("home-button").onclick = function(evt){
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    location.href = "../index.html";
}