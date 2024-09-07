// idk stuff goes here
// woah more stuff

// set up all constants / match cases
const zero = '0'

// main function
function clickmeuwu() {
    // set up flags
    let detectZero = false
    let containsDecimal = false
    let containsNonZero = false
    let withinZero = false

    // get data, and split into list of each character
    let inputSigFig = document.getElementById('sigFig').value
    let splitInput = inputSigFig.split('') // https://stackoverflow.com/questions/6484670/how-do-i-split-a-string-into-an-array-of-characters

    // check if contains decimal
    if (inputSigFig.includes('.')) {
        containsDecimal = true
    }

    // iterate through, selecting a character
    for (let topIndex = 0; topIndex < splitInput.length; topIndex++) {
        // select the current character
        topCurrent = splitInput[topIndex]

        // check every other character compared to this one
        for (let bottomIndex = 0; bottomIndex < splitInput.length; bottomIndex++) {
            // select the current character
            bottomCurrent = splitInput[bottomIndex]

            // if indexes match, skip as we dont want to evaluate the same character
            if (topIndex == bottomIndex) {
                continue
            }

            // check if character is equal to 0
            if (bottomCurrent == zero) {
                detectZero = true
                withinZero = true
            }
            // if character is not equal to 0
            else if (bottomCurrent != zero) {
                // if contains not zero is false, set true
                if (!containsNonZero) {
                    containsNonZero = true
                }
                // change started zero to false
                if (withinZero) {
                    withinZero = false
                }
            }
        }
    }

    // if no non zeros, just return length
    if (!detectZero) {
        console.log('the amount of significant figures is ' + inputSigFig.length)
    }
}