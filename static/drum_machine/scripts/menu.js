(function(window)
{
function Menu()
{

}

var IS_PLAYING = false;
var PLAY_ELEMENT = null;
var BEATS_ELEMENT = null;
var BEATS_VALUE_ELEMENT = null;
var STEPS_ELEMENT = null;
var STEPS_VALUE_ELEMENT = null;
var TEMPO_ELEMENT = null;
var TEMPO_VALUE_ELEMENT = null;
var BEAT_NAME_ELEMENT = null;

Menu.init = function()
{
var container = document.querySelector( '#DrumMenu' );
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
volumeValue.innerHTML = Number( gain ).toFixed( 1 );

volume.onchange = function( event )
    {
    Audio.setGain( volume.value );

    Menu.stopPlaying();
    };
volume.oninput = function()
    {
    volumeValue.innerHTML = Number( volume.value ).toFixed( 1 );
    };


    // tempo
var tempo = container.querySelector( '#Tempo' );
var tempoValue = container.querySelector( '#TempoValue' );

var currentTempo = currentBeat.tempo;

tempo.value = currentTempo;
tempoValue.innerHTML = currentTempo;

tempo.onchange = function( event )
    {
    Beats.getCurrent().tempo = tempo.value;

    Menu.stopPlaying();
    };
tempo.oninput = function( event )
    {
    tempoValue.innerHTML = tempo.value;
    };


    // beats per pattern
var beats = container.querySelector( '#BeatsPerPattern' );
var beatsValue = container.querySelector( '#BeatsPerPatternValue' );

beats.value = currentBeat.how_many_beats;
beatsValue.innerHTML = currentBeat.how_many_beats;

beats.onchange = function( event )
    {
    Menu.stopPlaying();
    DrumMachine.setBeatsPerPattern( beats.value );
    Menu.customBeatName();
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
    Menu.stopPlaying();
    DrumMachine.setStepsPerBeat( steps.value );
    Menu.customBeatName();
    };
steps.oninput = function( event )
    {
    stepsValue.innerHTML = steps.value;
    };

container.style.display = 'block';

    // beat selector
    // add the default beats
var beatsContainer = container.querySelector( '#DefaultBeatsContainer' );
var beatNames = Beats.getNames();

for (var a = 0 ; a < beatNames.length ; a++)
    {
    Menu.addBeat( beatNames[ a ], beatsContainer );
    }

    // current beat
var beatNameElement = container.querySelector( '#CurrentBeatName' );

beatNameElement.innerHTML = currentBeat.name;

    // save beat
var save = container.querySelector( '#SaveBeat' );

if ( save )
    {
    save.onclick = DrumMachine.saveBeat;
    }


    // save references to the html elements
PLAY_ELEMENT = play;
BEATS_ELEMENT = beats;
BEATS_VALUE_ELEMENT = beatsValue;
STEPS_ELEMENT = steps;
STEPS_VALUE_ELEMENT = stepsValue;
TEMPO_ELEMENT = tempo;
TEMPO_VALUE_ELEMENT = tempoValue;
BEAT_NAME_ELEMENT = beatNameElement;
};


Menu.playClick = function()
{
if ( IS_PLAYING )
    {
    PLAY_ELEMENT.innerHTML = 'Play';
    IS_PLAYING = false;
    DrumMachine.stop();
    }

else
    {
    IS_PLAYING = true;
    PLAY_ELEMENT.innerHTML = 'Stop';

    DrumMachine.playAgain();
    }
};

Menu.stopPlaying = function()
{
IS_PLAYING = false;
PLAY_ELEMENT.innerHTML = 'Play';
DrumMachine.stop();
};

Menu.customBeatName = function()
{
BEAT_NAME_ELEMENT.innerHTML = 'custom';
};


Menu.addBeat = function( name, container )
{
var beat = document.createElement( 'span' );

beat.className = 'button';
beat.innerHTML = name;
beat.onclick = function()
    {
    DrumMachine.selectBeat( name );

    var currentBeat = Beats.getCurrent();

    BEATS_ELEMENT.value           = currentBeat.how_many_beats;
    BEATS_VALUE_ELEMENT.innerHTML = currentBeat.how_many_beats;
    STEPS_ELEMENT.value           = currentBeat.steps_per_beat;
    STEPS_VALUE_ELEMENT.innerHTML = currentBeat.steps_per_beat;
    TEMPO_ELEMENT.value           = currentBeat.tempo;
    TEMPO_VALUE_ELEMENT.innerHTML = currentBeat.tempo;
    BEAT_NAME_ELEMENT.innerHTML   = currentBeat.name;
    Menu.stopPlaying();
    };

container.appendChild( beat );
};


window.Menu = Menu;

}(window));