var STATIC_URL = '';


window.onload = function()
{
Audio.load( DrumMachine.init, STATIC_URL );
};



function keyboardShortcuts( event )
{
var key = event.keyCode;

    // disallow keyboard shortcuts when you're changing some option
if ( document.activeElement.tagName === 'INPUT' )
    {
    return;
    }

if ( key == EVENT_KEY.space )
    {
    Menu.playClick();
    }
}