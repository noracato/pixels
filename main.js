let squareViewWidth = 2;
let squareWidth = $(window).width() / (100/ squareViewWidth);

$( document ).ready(fillScreen);

function fillScreen() {
    let amount = $(window).height() / squareWidth;

    for (var i=0; i < amount; i++) {
        addRow(i);
    }

    flipRandomSquares(amount * 140);

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
    let amount = 100 / squareViewWidth;
    let row = $('<div></div>');
    row.addClass('row');
    row.data('number', i);
    for (var i=0; i < amount; i++) {
        createSquare(row, i);
    }

    $('.container').append(row);
}

function createSquare(row, i){
    let sq = $('<div></div>');
    sq.addClass('square');
    sq.addClass('state-1');
    sq.data('number', i);
    sq.mouseenter(function() {
        flipColumn(sq);
    });

    addBrightness(sq);

    row.append(sq);
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

