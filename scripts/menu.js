(function(window)
{
function Menu()
{

}

var IS_PLAYING = false;
var PLAY_ELEMENT = null;


Menu.init = function()
{
var container = document.querySelector( '#Menu' );
var currentBeat = Beats.getCurrent();

    // play button
var play = container.querySelector( '#Play' );

IS_PLAYING = false;
play.innerHTML = 'Play';

play.onclick = Menu.playClick;


    // volume
var volume = container.querySelector( '#Volume' );
var volumeValue = container.querySelector( '#VolumeValue' );

var gain = Audio.getGain();

volume.value = gain;
volumeValue.innerHTML = gain;

volume.onchange = function( event )
    {
    Audio.setGain( volume.value );

    if ( IS_PLAYING )
        {
        playAgain();
        }
    };
volume.oninput = function()
    {
    volumeValue.innerHTML = volume.value;
    };


    // tempo
var tempo = container.querySelector( '#Tempo' );
var tempoValue = container.querySelector( '#TempoValue' );

var currentTempo = INFO.TEMPO;

tempo.value = currentTempo;
tempoValue.innerHTML = currentTempo;

tempo.onchange = function( event )
    {
    INFO.TEMPO = tempo.value;

    if ( IS_PLAYING )
        {
        playAgain();
        }
    };
tempo.oninput = function( event )
    {
    tempoValue.innerHTML = tempo.value;
    };


    // beat selector
var selector = container.querySelector( '#BeatSelector' );
var beatNames = Beats.getNames();

for (var a = 0 ; a < beatNames.length ; a++)
    {
    var name = beatNames[ a ];
    var option = document.createElement( 'option' );

    option.value = name;
    option.innerHTML = name;

    if ( currentBeat.name == name )
        {
        option.selected = true;
        }

    selector.appendChild( option );
    }

selector.onchange = function( event )
    {
    var selectedOption = selector.options[ selector.selectedIndex ];

    selectBeat( selectedOption.value );

    var currentBeat = Beats.getCurrent();

    beats.value = currentBeat.how_many_beats;
    beatsValue.innerHTML = currentBeat.how_many_beats;
    steps.value = currentBeat.steps_per_beat;
    stepsValue.innerHTML = currentBeat.steps_per_beat;

    if ( IS_PLAYING )
        {
        playAgain();
        }
    };


    // beats per pattern
var beats = container.querySelector( '#BeatsPerPattern' );
var beatsValue = container.querySelector( '#BeatsPerPatternValue' );

beats.value = currentBeat.how_many_beats;
beatsValue.innerHTML = currentBeat.how_many_beats;

beats.onchange = function( event )
    {
    Menu.stopPlaying();
    setBeatsPerPattern( beats.value );
    };
beats.oninput = function( event )
    {
    beatsValue.innerHTML = beats.value;
    };


    // steps per beat
var steps = container.querySelector( '#StepsPerBeat' );
var stepsValue = container.querySelector( '#StepsPerBeatValue' );

steps.value = currentBeat.steps_per_beat;
stepsValue.innerHTML = currentBeat.steps_per_beat;

steps.onchange = function( event )
    {
    setStepsPerBeat( steps.value );
    Menu.stopPlaying();
    };
steps.oninput = function( event )
    {
    stepsValue.innerHTML = steps.value;
    };

container.style.display = 'block';

    // save references to the html elements
PLAY_ELEMENT = play;
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

Menu.stopPlaying = function()
{
IS_PLAYING = false;
PLAY_ELEMENT.innerHTML = 'Play';
stop();
};


window.Menu = Menu;

}(window));