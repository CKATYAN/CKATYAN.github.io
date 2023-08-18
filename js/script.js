import * as cookieModule from "./cookieScript.js"

window.addEventListener("load", () => {
    console.log("trying to load")
    const request = new Request("../json/site_content.json")
    fetch(request)
        .then(response => response.json())
        .then(data => uploadSiteContent(data))
        .catch(console.error)
}, false)

const uploadSiteContent = data => {
    let language = document.documentElement.lang
    const cookie = cookieModule.get("language")
    if (cookie) {
        language = cookie
        document.documentElement.lang = cookie
    }
    const header = document.getElementsByTagName("a")
    for (const index in Array.from(header)) {
        header[index].textContent = data[language].header[index]
    }
    // TO DO: should i load all stuff, or exist a way to load in parts
    document.getElementById("about").innerHTML = data[language].about
    document.getElementById("contact").innerHTML = data[language].contact
}

document.addEventListener("click", (element) => {
    const {target} = element
    if (target.matches("img")) userCopyActionHandler(target.id)
    if (target.matches("a")) userHeaderActionsHandler(target.id)
    element.preventDefault()
    return
})

const userCopyActionHandler = id => {
    if (id != "copyIcon") return
    document.getElementById("pageName").textContent = "Copied"
    setTimeout(() => document.getElementById("pageName").textContent = "Lorem ipsum",1000)
}

const userHeaderActionsHandler = id => {
    const object = {
        "homeLink": () => location.reload(),
        "aboutLink": () => openAbout(),
        "contactLink": () => history.replaceState({}, "", "#contact"),
        "langSwitch": () => switchLanguage()
    }[id]()
}

const openAbout = () => {
    history.replaceState({}, "", "#about")
    document.getElementById("pageName").textContent = "About project"
    // TO DO: should i use it?
}

const switchLanguage = () => {
    let language = document.documentElement.lang
    const object = {
        "en": () => language = "ru",
        "ru": () => language = "en"
    }[language]()

    cookieModule.set("language", language, 7)
    location.reload()
}