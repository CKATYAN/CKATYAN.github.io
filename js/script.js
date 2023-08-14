function loadJSON() {
    console.log("loaded")
    const request = new Request("../json/siteLocalisation.json");
    fetch(request)
        .then(response => response.json())
        .then(data => postSiteContent(data))
        .catch(console.error)
}
window.addEventListener("load", loadJSON, false)

function postSiteContent(data) { 
    const header = document.getElementsByTagName("a")
    for (const index in Array.from(header)) {
        header[index].textContent = data.english[index]
    }
}

function changeTextContent(id,content) {
    if(typeof content  === 'string') {
        document.getElementById(id).textContent = content
    } else {
        console.error(`Argument("${content}") type of "changePageName" function is not "string".`)
    }
}

function userHeaderActionsHandler(id) {
    console.log(id, "clicked")
    switch (id) {
        case ("siteName"):
            changeTextContent("pageName","Lorem ipsum")
            break
        case ("about"):
            changeTextContent("pageName","About project")
            break
        case ("contact"):
            changeTextContent("pageName","Contact")
            break
        case ("copyIcon"):
            changeTextContent("pageName","Copied")
            setTimeout(() => changeTextContent("pageName","Lorem ipsum"),1000)
            break
    }
}

const header = document.querySelectorAll("a, img")
Array.from(header).forEach(element => {
    element.addEventListener("click", () => userHeaderActionsHandler(element.id))
});