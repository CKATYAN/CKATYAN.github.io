import { init } from "./render.js"
import { 
    userHashChangeActionHandler,
    userCopyActionHandler, 
    userSwitchLanguageActionHandler
} from "./handlers.js"

// TO DO : check first page load
window.addEventListener("load", init, false)

document.addEventListener("click", ({target}) => {
    let cases = {  
        "home" : () => userHashChangeActionHandler("/"),
        "about" : () => userHashChangeActionHandler("#about"),
        "contact" : () => userHashChangeActionHandler("#contact"),
        "copyIcon" : () => userCopyActionHandler(),
        "content" : () => userCopyActionHandler(),
        "switchLang": () => userSwitchLanguageActionHandler()
    }
    if (cases[target.id]) cases[target.id]()
})