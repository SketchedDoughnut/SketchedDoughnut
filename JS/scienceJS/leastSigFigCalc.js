// representing how many divs are present
// makes deleting things later easier
let currentDivCount = 0
// representing what signs to inject
// to each selection form
const operationInjections = [
    ['+', '+'],
    ['-', '-'],
    ['*', '*'],
    ['/', '/'],
    ['end', 'end']
]
// representing whether it is a sig fig or not
const sigFigOrNot = [
    ['is not sig fig', false],
    ['is sig fig', true]
]

// a function for injecting options into a selection
// this is a custom made thing for operations
function injectSelections(input, data) {
    let selection = document.getElementById(input)
    for (let iter = 0; iter < data.length; iter++) {
        current = data[iter]
        let option = document.createElement('option')
        option.textContent = current[0]
        option.value = current[1]
        selection.append(option)
    }
}

// creates new input fields
function createField() {
    // establish the new elements
    let form = document.getElementById(leastSigFigForm)
    let newDiv = document.createElement('div')
    let newInput = document.createElement('input')
    let operationSelection = document.createElement('select')
    let sigFigSelection = document.createElement('select')
    // set all of the IDs
    newDiv.setAttribute('id', divPrefix + currentDivCount)
    newInput.setAttribute('id', inputPrefix + currentDivCount)
    operationSelection.setAttribute('id', operationSelectPrefix + currentDivCount)
    sigFigSelection.setAttribute('id', sigFigSelectPrefix + currentDivCount)
    // set any other values for things
    newInput.setAttribute('placeholder', 'number')
    // append everything to their respective elements
    newDiv.append(newInput)
    newDiv.append(operationSelection)
    newDiv.append(sigFigSelection)
    form.append(newDiv)
    // add selections to the new fields
    injectSelections(operationSelectPrefix + currentDivCount, operationInjections)
    injectSelections(sigFigSelectPrefix + currentDivCount, sigFigOrNot)
    // increase current count
    currentDivCount += 1
}

// resets the whole form
function resetForm() { 
    for (let iter = 0; iter < currentDivCount; iter++) {
        document.getElementById(divPrefix + iter).remove()
    }
    currentDivCount = 0
}

// runs on load, doing a variety of formatting
// for only the least significant figures page
window.addEventListener('load', function() {})

function getData() {
    // all lists
    let extractedData = []
    let calculatedSigFigData = []
    let extractedOperators = []
    let extractedSigFigMarkers = []
    // all other things
    let lowestSigFig = 0
    let outputString = ''

    // extract all data from the HTML
    for (let iter = 0; iter < currentDivCount; iter++) {
        extractedData.push(document.getElementById(inputPrefix + iter).value)
        extractedOperators.push(document.getElementById(operationSelectPrefix + iter).value)
        extractedSigFigMarkers.push(document.getElementById(sigFigSelectPrefix + iter).value)
    }

    // check all number values, transfer to sigFigData
    for (let iter = 0; iter < extractedData.length; iter++) {
        let current = extractedData[iter]
        let isSigFig = extractedSigFigMarkers[iter]
        if (isSigFig == 'false') { continue }
        let results = clickmeuwu(current.toString())
        if (results == errors.sigFigCalc.invalidChar) {
            display(leastSigFigCalcResults, 'invalid characters inputted!')
            return
        }
        else { 
            calculatedSigFigData.push(results)
        }
    }

    // find the lowest amount of sig figs
    lowestSigFig = Math.min(...calculatedSigFigData) // https://www.geeksforgeeks.org/javascript-spread-operator/

    // append everything into a string
    for (let iter = 0; iter < extractedData.length; iter++) {
        let currentNum = extractedData[iter]
        let currentOperator = extractedOperators[iter]
        outputString += currentNum + ' '
        outputString += currentOperator + ' '
    }

    // remove "end" from the end
    outputString = outputString.slice(0, (outputString.length - 4)) // https://medium.com/@onlinemsr/how-to-remove-the-last-character-from-a-string-in-javascript-3d1c238d1669
    
    // get the answer from the string
    let answer = eval(outputString) // UH OH OOPSY BE SCARED AAAAAAAAAAAAAAAAAAAAAAAAAA

    // round down to the correct amount of significant figures
    let currentSigFig = clickmeuwu(answer.toString())
}