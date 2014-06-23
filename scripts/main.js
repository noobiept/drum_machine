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
    { name: 'crash', row: document.querySelector( '#CrashRow' ) },
    { name: 'splash', row: document.querySelector( '#SplashRow' ) },
    { name: 'ride', row: document.querySelector( '#RideRow' ) },
    { name: 'hi_hat', row: document.querySelector( '#HiHatRow' ) },
    { name: 'snare', row: document.querySelector( '#SnareRow' ) },
    { name: 'tom_high', row: document.querySelector( '#HighTomRow' ) },
    { name: 'tom_medium', row: document.querySelector( '#MediumTomRow' ) },
    { name: 'tom_low', row: document.querySelector( '#LowTomRow' ) },
    { name: 'bass', row: document.querySelector( '#BassRow' ) }
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

