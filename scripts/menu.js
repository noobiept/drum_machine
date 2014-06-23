(function(window)
{
function Menu()
{

}

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

var isPlaying = false;
play.innerHTML = 'Play';

play.onclick = function()
    {
    if ( isPlaying )
        {
        play.innerHTML = 'Play';
        isPlaying = false;
        stop();
        }

    else
        {
        isPlaying = true;
        play.innerHTML = 'Stop';

        playAgain();
        }
    };


};


window.Menu = Menu;

}(window));