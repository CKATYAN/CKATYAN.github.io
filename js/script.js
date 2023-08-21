const getJSON = async (jsonFilePath) => {
    return await fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {return data})
        .catch(console.error)
}

const getCookiedLanguage = async () => {
    const cookieModule = await import("./cookieScript.js")
    // cookieModule.del("language") 
    return cookieModule.get("language") ?? "en"
}

const getWindowLocationHash = () => {
    return window.location.hash || "/"
}

const setCookiedLanguage = async (newLanguage) => {
    const cookieModule = await import("./cookieScript.js")
    cookieModule.set("language", newLanguage, 7)
}

const localizeHeader = (localizedHeaderContent) => {
    const header = document.getElementsByTagName("a")
    for (const index in Array.from(header)) {
        header[index].textContent = localizedHeaderContent[index]
    }
}

const goHome = language => {
    document.getElementById("copyIcon").classList.remove("hidden")
    document.getElementById("content").innerHTML = "Lorem ipsum bluh bluh".repeat(1000)
}

const goAbout = localizedAboutContent => {
    document.getElementById("copyIcon").classList.add("hidden")

    document.getElementById("pageName").textContent = localizedAboutContent.pageName
    document.getElementById("content").innerHTML = localizedAboutContent.content
}

const goContact = localizedAboutContent => {
    document.getElementById("copyIcon").classList.add("hidden")

    document.getElementById("pageName").textContent = localizedAboutContent.pageName
    document.getElementById("content").innerHTML = localizedAboutContent.content
}

export async function renderSite() {
    const content = await getJSON("../json/site_content.json")
    const language = await getCookiedLanguage()
    const location = getWindowLocationHash()

    document.documentElement.lang = language
    localizeHeader(content[language].header)

    const object = {
        "/" : () => goHome(language),
        "#about" : () => goAbout(content[language][location]),
        "#contact" : () => goContact(content[language][location])
    }[location]()
}

export function userHashChangeActionHandler(location) {
    window.history.replaceState({}, "", location)
    renderSite()
}

export async function userSwitchLanguageActionHandler() {
    const cookiedLanguage = await getCookiedLanguage()
    const newLanguage = {
        "en": "ru",
        "ru": "en"
    }
    
    setCookiedLanguage(newLanguage[cookiedLanguage])
    renderSite()
}

export function userCopyActionHandler() {
    const pageName = {
        "en": "Copied",
        "ru": "Скопировано"
    }

    document.getElementById("pageName").textContent = pageName[window.documentElement.lang]
    setTimeout(() => document.getElementById("pageName").textContent = "Lorem ipsum",1000)
}

window.addEventListener("load", renderSite, false)

document.addEventListener("click", ({target}) => {
    const unused = {
        "home" : () => userHashChangeActionHandler("/"),
        "about" : () => userHashChangeActionHandler("#about"),
        "contact" : () => userHashChangeActionHandler("#contact"),
        "copyIcon" : () => userCopyActionHandler(),
        "switchLang": () => userSwitchLanguageActionHandler()
    }[target.id]?.()
})