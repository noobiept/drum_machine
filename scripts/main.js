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

var componentsInfo = [
    { name: 'bass', row: document.querySelector( '#BassRow' ) },
    { name: 'snare', row: document.querySelector( '#SnareRow' ) },
    { name: 'hi_hat', row: document.querySelector( '#HiHatRow' ) }
];


for (var a = 0 ; a < componentsInfo.length ; a++)
    {
    var info = componentsInfo[ a ];
    var name = info.name;
    var row = info.row;

    COMPONENTS.push( new Component( name, BEAT[ name ], row ) );
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

