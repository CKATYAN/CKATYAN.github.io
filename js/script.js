const homeUrl = window.location.origin
console.log(homeUrl)

var writeHeaderBottom = (event) => {
    switch (window.location.href) {
        case (homeUrl + "/#about"):
            document.getElementById("pagename").textContent="About project"
            break
        case (homeUrl + "/#contact"):
            document.getElementById("pagename").textContent="Contact"
            break
    }
}
window.addEventListener("hashchange", writeHeaderBottom, false)
window.addEventListener("load", writeHeaderBottom, false)


