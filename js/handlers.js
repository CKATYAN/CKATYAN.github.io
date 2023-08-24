export async function userHashChangeActionHandler(location) {
    window.history.replaceState({}, "", location)

    await import("./render.js").then(module => module.renderSite())
}

export async function userSwitchLanguageActionHandler() {
    const cookieModule = await import("./cookie.js")
    const cookiedLanguage = cookieModule.get("language")
    const newLanguage = {
        "en": "ru",
        "ru": "en"
    }[cookiedLanguage]
    
    cookieModule.set("language", newLanguage, 7)
    await import("./render.js").then(module => module.renderSite())
}

export function userCopyActionHandler() {
    const pageName = {
        "en": "Copied",
        "ru": "Скопировано"
    }

    document.getElementById("pageName").textContent = pageName[document.documentElement.lang]
    setTimeout(() => document.getElementById("pageName").textContent = "Lorem ipsum",1000)

    var textContent = document.getElementById("content").textContent
    navigator.clipboard.writeText(textContent).then(() => {}, (error) => {
        console.error('Async: Could not copy text: ', error)
    })
}