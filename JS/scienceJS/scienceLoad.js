// all global elements (not inside a specific form)
const optionsForm = 'options'

// all elements for calculating how many significant figures
const sigFigCalcDiv = 'sigFigCalcDiv'
const sigFigCalcForm = 'sigFigCalcForm'
const sigFigValue = 'sigFigValue'
const sigFigCalcResults = 'sigFigCalcResults'

// all elements for calculating the least amount of significant figures
const leastSigFigDiv = 'leastSigFigDiv'
const leastSigFigForm = 'leastSigFigForm'
const createNewField = 'createNewField'


// all variables representing what form is hidden
const hiddenDivs = [
    sigFigCalcDiv,
    leastSigFigDiv
]

// all toggles
disablePageClearing = false





// displays text to the inputted element
function display(outputElement, text, append = false) {
    if (append) { document.getElementById(outputElement).innerText += text }
    else { document.getElementById(outputElement).innerText = 'Results: ' + text }
}





function togglePageClearing(override_value = null) {
    if (!(override_value == null)) { disablePageClearing = override_value }
    else { disablePageClearing = !disablePageClearing }
    document.getElementById('togglePageClearingButton').innerText = 'page clearing: ' + !disablePageClearing
}





// function for toggling what is hidden and what is shown
// called on from button clicks, takes in the element to toggle its appearance
function toggleHidden(element) {
    elem = document.getElementById(element)
    elem.classList.toggle('hidden')
    if (!disablePageClearing) {
        for (let iter = 0; iter < hiddenDivs.length; iter++) {
            current = hiddenDivs[iter]
            current_elem = document.getElementById(current)
            if (current == element) { continue }
            if ( !current_elem.classList.contains('hidden') ) { current_elem.classList.toggle('hidden') }
        }
    }
}





// disable refreshing page for every form
// and also do other stuff on load of page
// runs on load of things
window.addEventListener('load', function() {
    // disable page refresh for all forms when submitted
    disablePageRefreshOnSubmit(document.getElementById(optionsForm))
    disablePageRefreshOnSubmit(document.getElementById(sigFigCalcForm))
    disablePageRefreshOnSubmit(document.getElementById(leastSigFigForm))

    // set up text of things that have placeholder values by default
    togglePageClearing(false)
})