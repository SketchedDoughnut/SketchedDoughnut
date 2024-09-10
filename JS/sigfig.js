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
    let startedCount = false
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

    // if the message does not contain a valid character, error then return
    splitInput.forEach(element => {
        if (!(allowedChars.includes(element))) {
            display('invalid characters included!')
            return
        }
    })

    // if the message is only decimals, error then return
    onlyDecimalChar = true
    splitInput.forEach(element => {
        if (element != '.') {
            onlyDecimalChar = false
        }
    })
    if (onlyDecimalChar) {
        display('there is only decimal points here!')
        return
    }

    // check if it contains a non zero
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

        // if the current character is zero, currentIsZero = true
        // currentIsNotZero is the opposite of currentIsZero
        currentIsZero = character.includes('0')
        currentIsNotZero = !currentIsZero

        // same above, if the current character is zero, then currentIsZero is true
        // currentIsNotZero is the opposite of currentIsZero
        currentIsZero = character.includes('0')
        currentIsNotZero = !currentIsZero

        // if current is not zero, then we have encounterd a zero
        // so encounteredNonZeros is true
        if (character != '0') {encounteredNonZeros = true}

        // if you have not encountered a non zero, and the current character is 0, 
        // then leading zeros is true, meaning that there are zeros at the front of the number
        if (!encounteredNonZeros && character == '0') {
            leadingZeros = true
        }

        // if we have encountered non zero characters 
        // and the current character does not equal zero, 
        // set leading zeros to false, meaning we have stopped the leading zeros
        if (encounteredNonZeros && character != '0') {
            leadingZeros = false
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// USING LOGIC TO UPDATE COUNT

        // if the number has leading zeros, do not count 
        // instead just increase the iterator to the next loop
        if (leadingZeros) {continue}

        // all cases for if the current character is not a zero
        if (currentIsNotZero) {

            // if we have not started counting yet,
            // set startedCount to true as we are going to count from this point on
            if (!startedCount) {startedCount = true}

            // if we have started counting and we have entered a zone
            // where we have consistently hit zeros, then set 
            // enteredZeroZone to false because we are out of zeros
            // and have reached a non-zero character
            else if (startedCount && enteredZeroZone) {enteredZeroZone = false}
        }

        // all cases for if the current character is a zero
        else if (currentIsZero) {
            
            // if we have started counting and we have not entered a zero zone,
            // set the saved count to the current count,
            // then set entered zero zone to true
            // we do this because we can potentially continue on with
            // no following non-zero, and we don't count those zeros 
            // but we only dont count the zeros if there is no decimal point
            if (startedCount && !enteredZeroZone) {
                saveCount = currentCount
                enteredZeroZone = true
            }
        }

        // if we have started counting, 
        // increase the counter by 1
        if (startedCount && !character.includes('.')) {currentCount += 1}
    }    
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// POST LOOP LOGIC

    // if the message does not contain a decimal
    // and if we are in a zero zone
    // display the save state as we ignore the zeros at the end
    if (!containsDecimal && enteredZeroZone) {
        display('the amount of significant figures is: ' + saveCount)
        return
    }
    else {
        display('the amount of significant figures is: ' + currentCount)
    }
}