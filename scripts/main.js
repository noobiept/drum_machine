var BASE_URL = '';

var INTERVAL_F;

var INFO = {
    DIVISIONS: 8,
    TEMPO: 80
};

var BEAT = {
    crash      : [ 1, 0, 0, 0, 1, 0, 0, 0 ],
    splash     : [ 0, 0, 0, 1, 0, 0, 0, 1 ],
    ride       : [ 1, 0, 1, 0, 1, 0, 1, 0 ],
    hi_hat     : [ 1, 1, 1, 1, 1, 1, 1, 1 ],
    snare      : [ 0, 0, 1, 0, 0, 0, 1, 0 ],
    tom_high   : [ 1, 0, 0, 0, 0, 0, 0, 0 ],
    tom_medium : [ 0, 1, 0, 0, 0, 0, 0, 0 ],
    tom_low    : [ 0, 0, 0, 0, 0, 0, 0, 1 ],
    bass       : [ 1, 0, 0, 0, 1, 0, 0, 0 ]
};

var COMPONENTS = [];

window.onload = function()
{
Audio.load( init, BASE_URL );
};



function init()
{
Menu.init();

var componentsInfo = [
     'crash', 'splash', 'ride',
     'hi_hat', 'snare', 'tom_high',
     'tom_medium', 'tom_low', 'bass'
    ];


for (var a = 0 ; a < componentsInfo.length ; a++)
    {
    var name = componentsInfo[ a ];

    COMPONENTS.push( new Component( name, BEAT[ name ] ) );
    }

window.onkeyup = keyboardShortcuts;
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
stop();

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


function keyboardShortcuts( event )
{
var key = event.keyCode;

if ( key == EVENT_KEY.space )
    {
    Menu.playClick();
    }
}