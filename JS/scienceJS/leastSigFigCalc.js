// function for creating more input elements 
// made for the least significant figures calculator
function createInput() {
    form = document.getElementById(leastSigFigForm)
    // create a new div to arrange things vertically
    // no div means things get arranged horizontally instead
    // which looks like a bunch of a bricks in a wall
    // no bueno
    newDiv = document.createElement('div')
    newDiv.setAttribute('id', resetElementID)
    newInput = document.createElement('input') 
    newDiv.append(newInput)
    form.append(newDiv)
}