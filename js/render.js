const getJSON = async (jsonFilePath) => {
    return await fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {return data})
        .catch(console.error)
}

const getLanguage = async () => {
    const cookieModule = await import("./cookie.js")
    // cookieModule.del("language") 
    return cookieModule.get("language") ?? "en"
}

const renderHeader = (localizedHeaderContent) => {
    const header = document.getElementsByTagName("a")
    for (const index in Array.from(header)) {
        header[index].textContent = localizedHeaderContent[index]
    }
}

const renderHome = language => {
    document.getElementById("copyIcon").classList.remove("hidden")
    document.getElementById("content").innerHTML = "Lorem ipsum bluh bluh".repeat(40)
}

const renderAbout = localizedAboutContent => {
    document.getElementById("copyIcon").classList.add("hidden")

    document.getElementById("pageName").textContent = localizedAboutContent.pageName
    document.getElementById("content").innerHTML = localizedAboutContent.content
}

const renderContact = localizedAboutContent => {
    document.getElementById("copyIcon").classList.add("hidden")

    document.getElementById("pageName").textContent = localizedAboutContent.pageName
    document.getElementById("content").innerHTML = localizedAboutContent.content
}

export async function renderSite() {
    const content = await getJSON("../json/site_content.json")
    const language = await getLanguage()
    const location = window.location.hash || "/"

    document.documentElement.lang = language
    renderHeader(content[language].header)

    const object = {
        "/" : () => renderHome(language),
        "#about" : () => renderAbout(content[language][location]),
        "#contact" : () => renderContact(content[language][location])
    }[location]()
}