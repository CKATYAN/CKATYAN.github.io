import * as cookieModule from "./cookieScript.js"

const getJSON = async () => {
    console.log("trying to load")
    const request = new Request("../json/site_content.json")
    return await fetch(request)
        .then(response => response.json())
        .then(data => {return data})
        .catch(console.error)
}

const getLanguage = () => {
    return cookieModule.get("language") ?? "en"
}

const init = async () => {
    const content = await getJSON()
    const language = getLanguage()

    setHeader(content[language])
    setSite(content, language, window.location.hash || "/")
}

const setHeader = localizedContent => {
    const header = document.getElementsByTagName("a")
    for (const index in Array.from(header)) {
        header[index].textContent = localizedContent.header[index]
    }
}

const setSite = (content, language, location) => {
    window.history.replaceState({}, "", location)
    document.getElementById("copyIcon").classList.add("hidden")
    document.documentElement.lang = language

    document.getElementById("pageName").textContent = content[language].pageName[location]
    document.getElementById("content").innerHTML = content[language][location]

    if(location == "/") setHomeContent()
}

const setHomeContent = () => {
    document.getElementById("copyIcon").classList.remove("hidden")

    document.getElementById("content").innerHTML = "Lorem ipsum bluh bluh".repeat(1000)
}

const userHashChangeActionHandler = async (location) => {
    window.history.replaceState({}, "", location)
    setSite(await getJSON(), getLanguage(), location)
}

const userCopyActionHandler = (language) => {
    const pageName = {
        "en": "Copied",
        "ru": "Скопировано"
    }

    document.getElementById("pageName").textContent = pageName[language]
    setTimeout(() => document.getElementById("pageName").textContent = "Lorem ipsum",1000)
}

const userSwitchLanguageActionHandler = (language) => {
    const newLanguage = {
        "en": "ru",
        "ru": "en"
    }

    cookieModule.set("language", newLanguage[language], 7)
    init()
}

window.addEventListener("load", init, false)

document.addEventListener("click", ({target}) => {
    const unused = {
        "home" : () => userHashChangeActionHandler("/"),
        "about" : () => userHashChangeActionHandler("#about"),
        "contact" : () => userHashChangeActionHandler("#contact"),
        "copyIcon" : () => userCopyActionHandler(getLanguage()),
        "switchLang": () => userSwitchLanguageActionHandler(getLanguage())
    }[target.id]?.()
})