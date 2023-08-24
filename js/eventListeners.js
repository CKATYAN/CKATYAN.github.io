import { init } from "./render.js"
import { 
    userHashChangeActionHandler,
    userCopyActionHandler, 
    userSwitchLanguageActionHandler
} from "./handlers.js"

window.addEventListener("load", init, false)

document.addEventListener("click", ({target}) => {
    const unused = {
        "home" : () => userHashChangeActionHandler("/"),
        "about" : () => userHashChangeActionHandler("#about"),
        "contact" : () => userHashChangeActionHandler("#contact"),
        "copyIcon" : () => userCopyActionHandler(),
        "switchLang": () => userSwitchLanguageActionHandler()
    }[target.id]?.()
})