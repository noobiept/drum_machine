(function(window)
{
function Menu()
{

}

var IS_PLAYING = false;
var PLAY_ELEMENT = null;

Menu.init = function()
{
    // play button
var play = document.querySelector( '#Play' );

IS_PLAYING = false;
PLAY_ELEMENT = play;
play.innerHTML = 'Play';

play.onclick = Menu.playClick;


    // volume
var volume = document.querySelector( '#Volume' );
var volumeValue = document.querySelector( '#VolumeValue' );

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


    // tempo
var tempo = document.querySelector( '#Tempo' );
var tempoValue = document.querySelector( '#TempoValue' );

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



    // beat selector
var selector = document.querySelector( '#BeatSelector' );
var beatNames = Beats.getNames();

for (var a = 0 ; a < beatNames.length ; a++)
    {
    var name = beatNames[ a ];
    var option = document.createElement( 'option' );

    option.value = name;
    option.innerHTML = name;

    selector.appendChild( option );
    }

selector.onchange = function( event )
    {
    var selectedOption = selector.options[ selector.selectedIndex ];

    selectBeat( selectedOption.value );
    };

    // beats per pattern
var beats = document.querySelector( '#BeatsPerPattern' );
var beatsValue = document.querySelector( '#BeatsPerPatternValue' );

var currentBeat = Beats.getCurrent();

beats.value = currentBeat.how_many_beats;
beatsValue.innerHTML = currentBeat.how_many_beats;

beats.onchange = function( event )
    {
    setBeatsPerPattern( beats.value );
    };
beats.oninput = function( event )
    {
    beatsValue.innerHTML = beats.value;
    };


    // steps per beat
var steps = document.querySelector( '#StepsPerBeat' );
var stepsValue = document.querySelector( '#StepsPerBeatValue' );

steps.value = currentBeat.steps_per_beat;
stepsValue.innerHTML = currentBeat.steps_per_beat;

steps.onchange = function( event )
    {
    setStepsPerBeat( steps.value );
    };
steps.oninput = function( event )
    {
    stepsValue.innerHTML = steps.value;
    };
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