// establish variables for IDs of elements
const optionsForm = 'options'
const sigFigInputDiv = 'sigFigInputDiv'
const sigFigInputForm = 'sigFigInput'
const sigFigInput = 'sigFig'
const sigFigOutput = 'sigfig calculation results'
const leastSigFigForm = 'leastSigFigInput'





// displays text to the inputted element
function display(outputElement, text, append = false) {
    if (append) { document.getElementById(outputElement).innerText += text }
    else { document.getElementById(outputElement).innerText = 'Results: ' + text }
}





// function for toggling what is hidden and what is shown
// called on from button clicks, takes in the element to toggle its appearance
function toggleHidden(element) {
    document.getElementById(element).classList.toggle('hidden')
}





// disable refreshing page for every form
// runs on load of things
window.addEventListener('load', function() {
    disablePageRefreshOnSubmit(document.getElementById(optionsForm)) // for selecting current page
    disablePageRefreshOnSubmit(document.getElementById(sigFigInputForm)) // for calculating how many sigfigs
    disablePageRefreshOnSubmit(document.getElementById(leastSigFigForm)) // for calculating least sigfigs
})