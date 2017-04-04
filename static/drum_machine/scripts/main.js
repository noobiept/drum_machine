    // these variables can be changed in server templates
var STARTING_BEAT_ID = null;    // the id of a beat to load and show at the start


/**
 * The start of the application.
 */
window.onload = function()
{
var loading = document.createElement( 'div' );
loading.innerHTML = 'Loading..';

document.body.appendChild( loading );

try {
    Audio.load( function() {
        DrumMachine.init();
        document.body.removeChild( loading );
    }, '/static/' );
}

catch( error )
    {
    var message = document.createElement( 'h1' );

    message.innerHTML = error.message;
    document.body.appendChild( message );
    }
};


/**
 * Global keyboard shortcuts.
 */
function keyboardShortcuts( event )
{
var key = event.keyCode;

if ( key === EVENT_KEY.space )
    {
    DrumMachine.alternatePlayState();
    }
}