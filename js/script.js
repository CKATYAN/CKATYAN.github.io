import * as cookieModule from "./cookieScript.js"

const getJSON = async () => {
    console.log("trying to load")
    const request = new Request("../json/site_content.json")
    return await fetch(request)
        .then(response => response.json())
        .then(data => {return data})
        .catch(console.error)
}

const siteStart = () => {
    setLanguage()
    setHeader()
    checkLocation()
}

const setLanguage = () => {
    console.log(cookieModule.get("language"));
    const language = cookieModule.get("language") ?? "en"
    document.documentElement.lang = language
}

const setHeader = async () => {
    const content = await getJSON()
    const language = document.documentElement.lang
    const header = document.getElementsByTagName("a")

    for (const index in Array.from(header)) {
        header[index].textContent = content[language].header[index]
    }
}

const checkLocation = () => {
    window.location.hash ? hashLocationHandler() : generatePlaceHolderText()
}

const hashLocationHandler = async () => {
    const content = await getJSON()
    const language = document.documentElement.lang
    const copyIcon = document.getElementById("copyIcon")

    copyIcon.matches(".hidden") ? {} : copyIcon.classList.toggle("hidden")
    document.getElementById("pageName").textContent = content[language].pageName[window.location.hash]
    document.getElementById("content").innerHTML = content[language][window.location.hash]
}

const generatePlaceHolderText = () => {
    document.getElementById("content").innerHTML = "Lorem ipsum bluh bluh".repeat(1000)
}

const userCopyActionHandler = () => {
    document.getElementById("pageName").textContent = "Copied"
    setTimeout(() => document.getElementById("pageName").textContent = "Lorem ipsum",1000)
}

const userSwitchLanguageActionHandler = () => {
    const object = {
        "en": () => cookieModule.set("language", "ru", 7),
        "ru": () => cookieModule.set("language", "en", 7)
    }[document.documentElement.lang]()

    siteStart()
}

window.addEventListener("load", siteStart, false)

window.addEventListener("hashchange", hashLocationHandler)

document.addEventListener("click", ({target}) => {
    target.matches("#copyIcon") ? userCopyActionHandler() : {}
    target.matches("#langSwitch") ? userSwitchLanguageActionHandler() : {}
})