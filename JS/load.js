//////////////////// SETTING VARS ////////////////////
const PAGE_URL = location.toString();
const WEB_URL = "https://sketcheddoughnut.github.io/SketchedDoughnut/";

//////////////////// PRE-LOADING ////////////////////
// detect page that they are on, run the loading function for that page
window.addEventListener('load', async function() 
    {   
        if (PAGE_URL.includes('colour.html')) {colorOnLoad()}
        if (PAGE_URL.includes('bouncingdvdlogo.html')) {colorOnLoad()}
        if (PAGE_URL.includes('secure.html')) {secureOnLoad()}
        if (PAGE_URL.includes('sigfig.html')) {sigFigOnLoad()}
    }
)

//////////////////// ALL LOADER FUNCTIONS ////////////////////
// disables page refresh
function disablePageRefreshOnSubmit(element_to_add) {
    function handleForm(event) { 
        event.preventDefault();
    }
    element_to_add.addEventListener('submit', handleForm)
}

// sets up things for the sigFig page on call
function sigFigOnLoad() {
    submission_form = document.getElementById("sigFigInput")
    disablePageRefreshOnSubmit(submission_form)
}

// sets up things for the colors page upon call
function colorOnLoad() {
    document.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
}

// sets up things for the secure page upon call
function secureOnLoad() {
    var form = document.getElementById('token form');
    disablePageRefreshOnSubmit(form)
    options = [
        ['base.data', 'Base'], 
        ['sl_comm.data', 'TBD'], 
        ['cook.data', 'Cook'],
        ['save.data', 'Save'],  
    ]
    appload = document.getElementById('appload')
    for (let iter = 0; iter < options.length; iter++) {
        selection = options[iter]
        filename = selection[0]
        displayName = selection[1]
        selections_input = document.createElement('option')
        selections_input.textContent = displayName
        selections_input.value = filename
        appload.append(selections_input)
    }
}