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

// removes one bottom most form
function removeField() {
    if (currentDivCount == 0) { return }
    document.getElementById(divPrefix + (currentDivCount - 1)).remove()
    currentDivCount -= 1
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
        let results = clickmeuwu(current.toString(), false)[0]
        if (results == errors.sigFigCalc.invalidChar) {
            display(leastSigFigCalcResults, 'invalid characters inputted!')
            return
        }
        else { 
            calculatedSigFigData.push(results)
        }
    }

    // find the lowest amount of sig figs
    let lowestSigFig = Math.min(...calculatedSigFigData) // https://www.geeksforgeeks.org/javascript-spread-operator/

    // append everything into a string
    let equation = ''
    for (let iter = 0; iter < extractedData.length; iter++) {
        let currentNum = extractedData[iter]
        let currentOperator = extractedOperators[iter]
        equation += currentNum + ' '
        equation += currentOperator + ' '
    }

    // remove "end" from the end
    if (equation.includes(' end')) {
        equation = equation.slice(0, (equation.length - 4)) // https://medium.com/@onlinemsr/how-to-remove-the-last-character-from-a-string-in-javascript-3d1c238d1669
    }
    
    // get the answer from the string
    // UH OH OOPSY BE SCARED AAAAAAAAAAAAAAAAAAAAAAAAAA
    // but fr this is fine to do because no one can inject malicious code
    // the only issue it causes is if someone inflicts bad things upon themself 
    // by putting something into this eval
    // its self inflicted torture, simply. and isn't a risk for users!
    let answer = eval(equation) 
    answer = answer.toString()

    // get the current amount of significant figures
    // also get the new stripped answer, which only includes
    // the significant figures in the answer
    let currentSigFig = clickmeuwu(answer, false)[0]
    let significantAnswer = clickmeuwu(answer, false)[1]

    // while the current amount of significant figures is more then the lowest sig fig
    // start rounding numbers of the significantAnswer
    // this is different then rounding the raw answer, as it has only the significant figures
    // afterwards, we will add on the zeros.
    let calcAnswer = significantAnswer
    while (currentSigFig > lowestSigFig) {

        // divide number by 10
        // this moves the last number into the decimal zone
        // Math.round rounds to the nearest integer, so it'll round this properly
        // we keep doing this until we have the right amount (or less then) significant figures
        // we dont need to multiply by 10 again because the number has been converted back to an integer
        // mulitiplying by 10 weirdly modifies the result afterwards, which we don't want
        calcAnswer /= 10
        calcAnswer = Math.round(calcAnswer)
        currentSigFig = clickmeuwu(calcAnswer.toString(), false)[0]
    }

    // // go over the raw answer, and find out two things:
    // // 1: how many leading zeros there are
    // // 2: how many trailing zeros there are
    // // these should be shoved back onto calcAnswer before its outputted
    // // or well, set to finalAnswer, which is then outputted
    // let leadingZeroCount = 0
    // let countingLeading = true
    // for (let iter = 0; iter < answer.length; iter++) {
    //     character = answer[iter]

    //     // if the character is not zero, set countingLeading to false
    //     // this is because we are no longer counting leading zeros as we have found a non zero
    //     if (!(character.includes('0'))) {
    //         countingLeading = false
    //     }

    //     // if we are counting leading zeros
    //     // and the current character is zero,
    //     // increase leadingZeroCount by one
    //     if (countingLeading && character.includes('0')) {
    //         leadingZeroCount += 1
    //     }

    //     // if the character is a decimal
    //     // log where it is at
    //     if (character.includes('.')) {
    //         decimalIndex = iter
    //     }
    // }

    // // append all of the leading zeros to shovedAnswer
    // // the amount to add is shown above
    // let shovedAnswer = ''
    // for (let iter = 0; iter < leadingZeroCount; iter++) {
    //     shovedAnswer += '0'    
    //     console.log('appended: ' + shovedAnswer)
    // }
    // shovedAnswer += calcAnswer
    // console.log(shovedAnswer)
    // return

    // set to final answer
    let finalAnswer = calcAnswer

    // display and return
    // display(leastSigFigCalcResults, 'the answer is ' + finalAnswer + ', with ' + currentSigFig + ' significant figures.')
    display(leastSigFigCalcResults, "teehee, this still doesn't work...")
    return
}