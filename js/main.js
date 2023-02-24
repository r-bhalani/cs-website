var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    cursor: '⬜',
    delay: 40,
    deleteSpeed: 20,
    loop: true
});

typewriter.typeString('> Hello! My name is ')
    .changeDelay(120)
    .typeString('<span class="color-blue">Ruchi Bhalani</span>!')
    .pauseFor(2500)
    // .deleteAll()
    .deleteChars(32)
    .changeDelay(50)
    .typeString('I am a 3rd year ')
    .changeDelay(120)
    .typeString('<span class="color-green">computer science major</span>.')
    .pauseFor(1500)
    .deleteChars(33)
    .typeString('n <span class="color-green">integrated Master\'s student</span>.')
    .pauseFor(1500)
    .deleteChars(28)
    .typeString('<span class="color-yellow">undergraduate research assistant</span>.')
    .pauseFor(1000)
    .deleteChars(36)
    .typeString(' <span class="color-yellow">peer mentor</span>.')
    .pauseFor(1500)
    .deleteChars(12)
    .typeString('<span class="color-yellow">full stack developer</span>.')
    .pauseFor(1500)
    .deleteChars(29)
    .changeDelay(40)
    .typeString('Welcome to my ')
    .changeDelay(150)
    .typeString('<span class="color-pink">digital portfolio</span>!')
    .pauseFor(2500)
    .typeString(' :)')
    .pauseFor(3500)
    .start();
var paused = false;
function toggle() {
    if (paused) {
        typewriter.start();
        document.getElementById("image").src = "images/pause.png";
        paused = false;
    } else {
        typewriter.pause();
        document.getElementById("image").src = "images/play.png";
        paused = true;
    }
}

///////////////////////////////////////////

//Vim-like keybindings
let SCROLL = 30;
document.addEventListener('keypress', (e) => {
    //console.log(e.key);
    if (e.key === 'j') {
        if (numSet) {
            window.scrollBy(0,num*SCROLL);
            numSet = false;
        } else {
            window.scrollBy(0,SCROLL);
        }
    } else if (e.key === 'k') {
        if (numSet) {
            window.scrollBy(0,-1*num*SCROLL);
            numSet = false;
        } else {
            window.scrollBy(0,-1*SCROLL);
        }
    } else if (e.key === ' ') {
        e.preventDefault();
        this.toggle();
    } else if (e.key === 'G') {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }

});

let gSet = false;
let zSet = false;
let numSet = false;
let esc = false;
let lastKeyTime = Date.now();
let num = 0;

let open_cache = [];

document.addEventListener('keydown', event => {
    const charList = 'gzcCmMrRoO0123456789:q';
    var k = event.key;


    if (charList.indexOf(k) === -1) return;

    const currentTime = Date.now();

    if (currentTime - lastKeyTime > 1000) {
        gSet = k === 'g';
        zSet = k === 'z';
        esc = k === ':';
        if (isNaN(k)) {
            numSet = false;
        } else {
            numSet = true;
            num = parseInt(k);
        }
    } else if (gSet && k === 'g') {
        scrollTo(0,0);
        gSet = false;
        zSet = false;
    } else if (k === 'g') {
        gSet = true;
        zSet = false;
    } else if (k === 'z') {
        zSet = true;
        gSet = false;
    } else if (zSet && (k === 'C' || k === 'M')) {
        this.collapseAll();
        gSet = false;
        zSet = false;
    } else if (zSet && (k === 'R' || k === 'O')) {
        this.expandAll();
        gSet = false;
        zSet = false;
    } else if (zSet && (k === 'c' || k === 'm')) {
        var i;
        if (open_cache.length > 0) {
            expand(rev_dict[open_cache.pop()]);
            gSet = false;
            zSet = false;
            lastKeyTime = currentTime;
            return;
        }
        for (i = 0; i < popen.length; i++) {
            if (popen[i]) {
                expand(rev_dict[i]);
                gSet = false;
                zSet = false;
                lastKeyTime = currentTime;
                return;
            }
        }
        gSet = false;
        zSet = false;
    } else if (zSet && (k === 'r' || k === 'o')) {
        var i;
        for (i = 0; i < popen.length; i++) {
            if (!popen[i]) {
                expand(rev_dict[i]);
                gSet = false;
                zSet = false;
                lastKeyTime = currentTime;
                return;
            }
        }
        gSet = false;
        zSet = false;
    } else if (!isNaN(k)) {
        if (!numSet) {
            numSet = true;
            num = 0;
        }
        num = num * 10 + parseInt(k);
    }

    lastKeyTime = currentTime;
});



///////////////////////////////////////////


$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});