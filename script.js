//////////////////// SETTING VARS ////////////////////
const PAGE_URL = location.toString();
const WEB_URL = "https://sketcheddoughnut.github.io/SketchedDoughnut/";

//////////////////// PRE-LOADING ////////////////////
// detect page that they are on, run the loading function for that page
if (PAGE_URL.includes('colour.html')) {
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
