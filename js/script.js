import * as cookieModule from "./cookieScript.js"

var language = cookieModule.get("language")
var localizedData = ""

const downloadJSON = (language = "en") => {
    console.log("trying to load")
    const request = new Request("../json/site_content.json")
    fetch(request)
        .then(response => response.json())
        .then(data => {
            localizedData = data[language]
            uploadHeader()
            checkCurrentHashLocation()
        })
        .catch(console.error)
}

const uploadHeader = () => {
    const header = document.getElementsByTagName("a")
    for (const index in Array.from(header)) {
        header[index].textContent = localizedData.header[index]
    }
}

const checkCurrentHashLocation = () => {
    if(!window.location.hash) return
    document.getElementById("pageName").textContent = localizedData.pageName[window.location.hash]
    document.getElementById("content").innerHTML= localizedData[window.location.hash]
}

const userCopyActionHandler = () => {
    document.getElementById("pageName").textContent = "Copied"
    setTimeout(() => document.getElementById("pageName").textContent = "Lorem ipsum",1000)
}

const userSwitchLanguageActionHandler = () => {
    const object = {
        "en": () => language = "ru",
        "ru": () => language = "en"
    }[language]()

    cookieModule.set("language", language, 7)
    location.reload()
}

window.addEventListener("load", downloadJSON(language), false)

window.addEventListener("hashchange", checkCurrentHashLocation)

document.addEventListener("click", ({target}) => {
    if (target.matches("#copyIcon")) userCopyActionHandler()
    if (target.matches("#langSwitch")) userSwitchLanguageActionHandler()
})