var STATIC_URL = '';


window.onload = function()
{
Audio.load( DrumMachine.init, STATIC_URL );
};



function keyboardShortcuts( event )
{
var key = event.keyCode;

if ( key == EVENT_KEY.space )
    {
    Menu.playClick();
    }
}