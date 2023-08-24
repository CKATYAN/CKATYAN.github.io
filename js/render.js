const getJSON = async (jsonFilePath) => {
    return await fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {return data})
        .catch(console.error)
}

const renderHeader = localizedHeaderContent => {
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

const renderContact = localizedContactContent => {
    document.getElementById("copyIcon").classList.add("hidden")

    document.getElementById("pageName").textContent = localizedContactContent.pageName
    document.getElementById("content").innerHTML = localizedContactContent.content
}

export function renderSite() {
    const localizedContent = JSON.parse(sessionStorage.getItem("localizedContent"))
    const language = sessionStorage.getItem("language")
    const location = window.location.hash || "/"

    renderHeader(localizedContent.header)
    const object = {
        "/" : () => renderHome(language),
        "#about" : () => renderAbout(localizedContent[location]),
        "#contact" : () => renderContact(localizedContent[location])
    }[location]()
}

export async function init() {
    const content = await getJSON("../json/site_content.json")
    const language = await import("./cookie.js").then(module => {return module.get("language") ?? "en"})

    sessionStorage.setItem("localizedContent", JSON.stringify(content[language]))
    sessionStorage.setItem("language", language)

    renderSite()
}