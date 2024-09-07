// idk stuff goes here
// woah more stuff
// https://meetanshi.com/blog/reload-current-page-without-losing-any-form-data-in-javascript/#:~:text=The%20easiest%20way%20to%20reload,used%20programming%20languages%20by%20developers.

// displays text to the output
function display(text) {
    const outputText = document.getElementById('results')
    outputText.innerText = text
}

// main function
function clickmeuwu() {
    // set up constants
    const nonZeros = [
        '1', 
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ]
    const allowedChars = '.0123456789'

    //// set up flags
    // contains (blank)
    let containsZero  = false
    let containsNonZero = false
    let containsDecimal = false
    // currents
    let currentIsZero = false
    let currentIsNotZero = false
    // markers
    let leadingZeros = false
    let encounteredNonZeros = false
    let passedDecimal = false
    let startingCount = false
    let enteredZeroZone = false
    // running count
    let saveCount = 0
    let currentCount = 0

    // reset display
    display('')

    // get data, and split into list of each character
    let inputSigFig = document.getElementById('sigFig').value
    let splitInput = inputSigFig.split('') // https://stackoverflow.com/questions/6484670/how-do-i-split-a-string-into-an-array-of-characters

    // check if it contains a decimal
    containsDecimal = inputSigFig.includes('.')
    
    // check if it contains a zero
    containsZero = inputSigFig.includes('0')

    // if the message is only a period, return error
    if (inputSigFig == ".") {
        display('that is not a number!')
        return
    }

    // check if it contains a non zero
    // nonZeros.forEach(element => {
    splitInput.forEach(element => {
        if (element != 0) {
            containsNonZero = true
        }
        let allowedState = allowedChars.includes(element)
        if (!allowedState) {
            display('only characters allowed are: ' + allowedChars)
            return
        }
    });
    
    // iterate through, selecting a character
    for (let topIndex = 0; topIndex < splitInput.length; topIndex++) {

        // select the current character
        character = splitInput[topIndex]

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// DETECTING THINGS

        // if character is the decimal, passedDecimal = true. continue
        if (character == '.') {
            passedDecimal = true
            continue
        }

        // if the current is zero, currentIsZero = true. currentIsNotZero = false
        if (character == '0') {
            currentIsZero = true
            currentIsNotZero = false
        }

        // if the current is not zero, currentIsNotZero = true. currentIsZero = false
        // if current is not zero, encounteredNonZeros = true
        if (character != '0') {
            currentIsNotZero = true
            currentIsZero = false
            encounteredNonZeros = true
        }

        // if encounteredNonZeros is false and character is zero, leadingZeros = true
        if (!encounteredNonZeros && character == '0') {
            leadingZeros = true
        }

        // if encounteredNonZeros is true and character is not zero, leadingZeros = false
        if (encounteredNonZeros && character != '0') {
            leadingZeros = false
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// USING LOGIC TO UPDATE COUNT

        // if leadingZeros is true, dont count and instead just pass
        if (leadingZeros) {continue}
        
        // if we are out of any leading zeros
        else {

            // if the current number is not zero (double checking) and startingCount is false, increase currentCount and set startingCount to true
            if (currentIsNotZero && !startingCount) {
                startingCount = true
            }

            // if the current number is not a zero
            if (currentIsNotZero) {

                // if we have started counting, increase by 1
                if (startingCount) {
                    currentCount += 1
                }

                // // if the current number is not a zero and starting count is true and entered zero zone is true, set entered zero zone to false and increase currentCount
                else if (startingCount && enteredZeroZone) {
                    enteredZeroZone = false
                }
            }

            // if the current number is a zero
            else if (currentIsZero) {
                
                // if starting count is true and enteredZeroZone is false, save currentCount to saveCount (in case we never find another nonzero) and set enteredZeroZone to true
                // we set enteredZeroZone to true so this part does not repeat again
                if (startingCount && !enteredZeroZone) {
                    saveCount = currentCount
                    enteredZeroZone = true
                }

                // if the current number is a zero and started counting is true, increase currentCount
                if (startingCount) {
                    currentCount += 1
                }
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// DEBUG LOGGING

        // console.log('current is ' + character + ', and below are the states')
        // // WORKS
        // console.log('current is zero, ' + currentIsZero)
        // console.log('current is not zero, ' + currentIsNotZero)
        // console.log('contains zero, ' + containsZero)
        // console.log('contains non zero, ' + containsNonZero)
        // console.log('contains decimal, ' + containsDecimal)
        // console.log('leading zeros, ' + leadingZeros)
        // console.log('entered zero zone, ' + enteredZeroZone)
        // console.log('current count, ' + currentCount)
        // console.log('saved count, ' + saveCount)
        // NOT YET
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// POST LOOP LOGIC

    // if the current one is zero, revert currentCount to the saved point (we never reached another nonzero number) and display, then return
    if (currentIsZero || enteredZeroZone) {
        display('the amount of significant figures is ' + saveCount)
    }
    else {
        display('the amount of significant figures is ' + currentCount)
    }
}