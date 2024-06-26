//////////////////// SETTING VARS ////////////////////
const PAGE_URL = location.toString();
const WEB_URL = "https://sketcheddoughnut.github.io/SketchedDoughnut/";

//////////////////// PAGE DETECTING ////////////////////
// redirect to index.html
if (PAGE_URL === WEB_URL) {
    window.location.href = "https://sketcheddoughnut.github.io/SketchedDoughnut/index.html";
}

// detect page that they are on, run the loading function for that page
if (PAGE_URL.includes('color.html')) {
    colorOnLoad();
}

//////////////////// ALL LOADER FUNCTIONS ////////////////////
// sets up things for the colors page upon call
function colorOnLoad() {
    document.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
}