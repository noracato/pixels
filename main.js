let squareViewWidth = 2;
let squareWidth = $(window).width() / (100/ squareViewWidth);
let totalWidth = $(window).width();

$( document ).ready(fillScreen);
// $( document ).click(setupAudio);
////////////////////

// let audioCtx;
// let analyser;

// // get the audio element
// let audioElement = (new Audio('assets/ambient piace2.wav'));

// // pass it into the audio context
// let track;

// let playing = false;
// let setup = false;

// function setupAudio() {
//     if (!setup){
//         audioCtx = new AudioContext();
//         analyser = audioCtx.createAnalyser();
//         // audioElement= document.querySelector("audio");
//         track = audioCtx.createMediaElementSource(audioElement);
//         track.connect(audioCtx.destination);
//         setup = true;
//     }

//     console.log('playing')

//     // Check if context is in suspended state (autoplay policy)
//     if (audioCtx.state === "suspended") {
//         audioCtx.resume();
//     }

//     // Play or pause track depending on state
//     if (!playing) {
//         audioElement.play();
//         playing = true;
//     } else {
//         audioElement.pause();
//         playing = false;
//     }
// }


///////////////

function fillScreen() {
    let amount = $(window).height() / squareWidth;

    for (var i=0; i < amount; i++) {
        addRow(i);
    }

    flipRandomSquares(amount * 50);

    let squares = $('.square');
    setInterval(function(){
        flipColumn($(squares[Math.floor(Math.random() * squares.length)]));
    }, 500);
    setInterval(function(){
        flipRandomSquares(amount * 10);
    }, 4000);
}

function flipRandomSquares(amount) {
    let squares = $('.square');
    let index;

    for (let i = 0; i <amount; i++){
        index = Math.floor(Math.random() * squares.length);
        flip($(squares[index]));
    }
}

function addRow(i) {
    totalWidth = $(window).width();
    let amount = 100 / squareViewWidth;
    let row = $('<div></div>');
    row.addClass('row');
    row.data('number', i);
    let go = createSquare(row, 0);
    while (go) {
        go = createSquare(row, 0);
    }

    $('.container').append(row);
}

function createSquare(row, i){
    if (totalWidth < 10){
        return false;
    }
    let sq = $('<div></div>');
    sq.addClass('square');
    sq.addClass('state-1');
    let bullshit = Math.floor(Math.random() * 120);
    totalWidth -= bullshit;
    // bullshit = $(window).width() / bullshit;
    sq.css('width',  bullshit + 'px');
    let bullshitMore = Math.floor(Math.random() * 120);
    sq.css('height',  bullshitMore + 'px');

    sq.data('number', i);
    sq.mouseenter(function() {
        flipColumn(sq);
    });

    addBrightness(sq);

    row.append(sq);

    return true;
}

// Without classes but direct css??
function flip(sq) {
    let newState = Math.floor(Math.random() * 2);
    if (sq.hasClass('state-1')) {
        if (newState == 0){
            sq.addClass('state-2');
        } else {
            sq.addClass('state-3');
        }
        setTimeout(function(){sq.removeClass('state-1')}, 500);

    } else if (sq.hasClass('state-2')) {
        if (newState == 0){
            sq.addClass('state-1');
        } else {
            sq.addClass('state-3');
        }
        setTimeout(function(){sq.removeClass('state-2')}, 500);
    } else {
        if (newState == 0){
            sq.addClass('state-1');
        } else {
            sq.addClass('state-2');
        }
        setTimeout(function(){sq.removeClass('state-3')}, 500);
    }
    // addBrightness(sq);
}

function addBrightness(sq) {
    if (sq.css('background-color') == '#1d1dff') {
        sq.css('filter', 'brightness(' + ((Math.random() * 5)) + ')')
    } else {
        sq.css('filter', 'brightness(' + ((Math.random() * 3)) + ')')
    }
}

function flipColumn(sq) {
    $('.row div:nth-child('+sq.index()+')').each(function() {
        flipToWhite($(this));

        var current = $(this);

        setTimeout(function(){
            current.removeClass('white');
            flip(current);
        }, 2000);
    });

}

function flipToWhite(sq){
    if (sq.hasClass('white')){
        sq.css('filter', 'brightness(1)')
    } else {
        sq.addClass('white');
    }
}
