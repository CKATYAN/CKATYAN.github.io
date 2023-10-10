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

const renderHome = async localizedHomeContent => {
    document.getElementById("pageName").textContent = localizedHomeContent.pageName

    document.getElementById("copyIcon").classList.remove("hidden")
    await import("./lorem-ipsum.js").then(module => {
        document.getElementById("content").textContent = new module.LoremIpsum().generate(75)
    })
    // TO DO: try to make russian version
    // TO DO: try to calculate amount of generated word
    
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
    renderHeader(localizedContent.header)

    let cases = {  
        "/" : () => renderHome(localizedContent["/"]),
        "#about" : () => renderAbout(localizedContent["#about"]),
        "#contact" : () => renderContact(localizedContent["#contact"])
    }
    if(cases[location.hash]) cases[location.hash]()
    else cases["/"]()
}

export async function init() {
    const content = await getJSON("../json/site_content.json")
    const language = await import("./cookie.js").then(module => {return module.get("language") ?? "en"})

    sessionStorage.setItem("localizedContent", JSON.stringify(content[language]))
    sessionStorage.setItem("language", language)

    renderSite()
}