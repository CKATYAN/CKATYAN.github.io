const homeUrl = "https://ckatyan.github.io"
$(document).ready(()=>{
    let currentUrl = window.location.href;
    if (currentUrl == "https://ckatyan.github.io/html/about.html") {
        window.location.replace(homeUrl);
        document.getElementById("pagename").textContent="About project";
    }
})