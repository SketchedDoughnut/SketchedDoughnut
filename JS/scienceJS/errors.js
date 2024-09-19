class SigFigCalcErrors {
    constructor(parameters) {
        this.invalidChar = '1_Invalid-Char'
    }
}
class Errors {
    constructor(parameters) {
       this.sigFigCalc = new SigFigCalcErrors()
    }
}
const errors = new Errors()