const homeUrl = "https://ckatyan.github.io"
if (window.location.href == "https://ckatyan.github.io/html/about.html") {
    window.location.replace(homeUrl);
    document.getElementById("pagename").textContent="About project";
}