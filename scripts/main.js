var BASE_URL = '';

var INTERVAL_F;

var INFO = {
    DIVISIONS: 8,
    TEMPO: 80
};

var BEAT = {
    bass  : [ 1, 0, 0, 0, 1, 0, 0, 0 ],
    snare : [ 0, 0, 1, 0, 0, 0, 1, 0 ],
    hi_hat: [ 1, 1, 1, 1, 1, 1, 1, 1 ]
};

var COMPONENTS = [];

window.onload = function()
{
Audio.load( init, BASE_URL );
};



function init()
{
Menu.init();

var rows = document.querySelectorAll( '.ComponentRow' );

for (var a = 0 ; a < rows.length ; a++)
    {
    var row = rows[ a ];

    for (var b = 0 ; b < INFO.DIVISIONS ; b++)
        {
        var data = document.createElement( 'td' );

        data.innerHTML = '-';

        row.appendChild( data );
        }
    }


var componentsName = [ 'bass', 'snare', 'hi_hat' ];

for (var a = 0 ; a < componentsName.length ; a++)
    {
    var name = componentsName[ a ];

    COMPONENTS.push( new Component( name, BEAT[ name ] ) );
    }
}




function start()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].playSounds();
    }
}


function playAgain()
{
var tempo = INFO.TEMPO;

    // bar of 4
var interval = 60 / tempo * 4 * 1000;

INTERVAL_F = window.setInterval( start, interval );
start();
}


function stop()
{
window.clearInterval( INTERVAL_F );

Audio.stop();
}

