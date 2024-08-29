
// https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
const delay = (delayinMs) => {
    return new Promise(resolve => setTimeout(resolve, delayinMs))
}

// https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/
function getRandomElementWithReduce(array) {
    return array.reduce((selected, item) => {
        return Math.random() < 1 / (array.length) ? item : selected;
    }, array[0]);
}
// https://stackoverflow.com/questions/641857/javascript-window-resize-event
window.addEventListener('resize', function(event){
    MAX_WIDTH = window.innerWidth
    MAX_HEIGHT = window.innerHeight
  });

window.addEventListener('load', async function() 
    {   
        // set up DVD logo object
        dvd_logo = document.getElementById("svg_logo")
        dvd_logo.style.position = 'absolute'

        // set up direction constants
        RIGHT = 'right'
        LEFT = 'left'
        UP = 'up'
        DOWN = 'down'

        // set up max width and height
        // MAX_WIDTH = this.screen.width
        // MAX_HEIGHT = this.screen.height
        MAX_WIDTH = window.innerWidth
        MAX_HEIGHT = window.innerHeight

        // get width and height of image
        // https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height
        IMAGE_WIDTH = dvd_logo.getBoundingClientRect().width
        IMAGE_HEIGHT = dvd_logo.getBoundingClientRect().height

        // set up current translate modes
        xTranslate = RIGHT
        yTranslate = DOWN

        // set up current xPos and current yPos
        xPos = 0
        yPos = 0

        // set up colors
        colors = [
            '#00feff',
            'red',
            'white',
            'yellow',
            'green',
            'purple'
        ]

        // main loop
        while (true) { 
            // set up some vars
            collided = false

            // include objects width and height in dimensions
            xInclusiveWidth = xPos + IMAGE_WIDTH
            yInclusiveHeight = yPos + IMAGE_HEIGHT
            
            // check coordinates and change modes
            if (xPos <= 0) {xTranslate = RIGHT; collided = true}
            else if (xInclusiveWidth >= MAX_WIDTH) {xTranslate = LEFT; collided = true}
            if (yPos <= 0) {yTranslate = DOWN; collided = true}
            else if (yInclusiveHeight >= MAX_HEIGHT) {yTranslate = UP; collided = true}

            // update coordinates
            if (xTranslate == RIGHT) {xPos += 1}
            else if (xTranslate == LEFT) {xPos -= 1}
            if (yTranslate == DOWN) {yPos += 1}
            else if (yTranslate == UP) {yPos -= 1}

            // update position
            dvd_logo.style.left = xPos + 'px'
            dvd_logo.style.top = yPos + 'px'
            
            // update color
            if (collided == true) {
                color = getRandomElementWithReduce(colors)
                dvd_logo.contentDocument.querySelector('g').style.fill = color
            }

            // debug section
            // console.log(collided)

            // delay
            await delay(1)
            
        }
    }
)