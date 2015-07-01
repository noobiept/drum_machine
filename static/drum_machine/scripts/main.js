    // these variables can be changed in server templates
var STARTING_BEAT = '';


window.onload = function()
{
try {
    Audio.load( DrumMachine.init, '/static/' );
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