const homeUrl = "https://ckatyan.github.io"
switch (window.location.href) {
    case "https://ckatyan.github.io/#about":
        document.getElementById("pagename").textContent="About project";
        break;    
    case "https://ckatyan.github.io/#contact":
        document.getElementById("pagename").textContent="Contact";
        break;   
}