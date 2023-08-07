const homeUrl = "https://ckatyan.github.io"
switch (window.location.href) {
    case "https://ckatyan.github.io/html/about.html":
        window.location.replace(homeUrl);
        document.getElementById("pagename").textContent="About project";
        break;    
    case "https://ckatyan.github.io/html/contact.html":
        window.location.replace(homeUrl);
        document.getElementById("pagename").textContent="Contact";
        break;   
}