(function(window)
{
function Menu()
{

}

var IS_PLAYING = false;
var PLAY_ELEMENT = null;

Menu.init = function()
{
var play = document.querySelector( '#Play' );
var volume = document.querySelector( '#Volume' );
var volumeValue = document.querySelector( '#VolumeValue' );
var tempo = document.querySelector( '#Tempo' );
var tempoValue = document.querySelector( '#TempoValue' );

var gain = Audio.getGain();

volume.value = gain;
volumeValue.innerHTML = gain;

volume.onchange = function( event )
    {
    Audio.setGain( volume.value );
    playAgain();
    };
volume.oninput = function()
    {
    volumeValue.innerHTML = volume.value;
    };

var currentTempo = INFO.TEMPO;

tempo.value = currentTempo;
tempoValue.innerHTML = currentTempo;

tempo.onchange = function( event )
    {
    INFO.TEMPO = tempo.value;
    playAgain();
    };
tempo.oninput = function( event )
    {
    tempoValue.innerHTML = tempo.value;
    };

IS_PLAYING = false;
PLAY_ELEMENT = play;
play.innerHTML = 'Play';

play.onclick = Menu.playClick;
};


Menu.playClick = function()
{
if ( IS_PLAYING )
    {
    PLAY_ELEMENT.innerHTML = 'Play';
    IS_PLAYING = false;
    stop();
    }

else
    {
    IS_PLAYING = true;
    PLAY_ELEMENT.innerHTML = 'Stop';

    playAgain();
    }
};


window.Menu = Menu;

}(window));