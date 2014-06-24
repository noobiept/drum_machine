var BASE_URL = '';

var INTERVAL_F;

var INFO = {
    TEMPO: 80
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
var beat = Beats.getCurrent();

for (var a = 0 ; a < componentsInfo.length ; a++)
    {
    var name = componentsInfo[ a ];

    COMPONENTS.push( new Component( name, beat[ name ] ) );
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
var beat = Beats.getCurrent();

var interval = 60 / tempo * beat.how_many_beats * 1000;

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