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

    Menu.stopPlaying();
    };
volume.oninput = function()
    {
    volumeValue.innerHTML = volume.value;
    };


    // tempo
var tempo = container.querySelector( '#Tempo' );
var tempoValue = container.querySelector( '#TempoValue' );

var currentTempo = DrumMachine.getTempo();

tempo.value = currentTempo;
tempoValue.innerHTML = currentTempo;

tempo.onchange = function( event )
    {
    DrumMachine.setTempo( tempo.value );

    Menu.stopPlaying();
    };
tempo.oninput = function( event )
    {
    tempoValue.innerHTML = tempo.value;
    };


    // beat selector
var beatsContainer = container.querySelector( '#DefaultBeatsContainer' );
var beatNames = Beats.getNames();

var loadBeat = function( beatName )
    {
    return function()
        {
        DrumMachine.selectBeat( beatName );

        var currentBeat = Beats.getCurrent();

        DrumMachine.setTempo( currentBeat.tempo );

        beats.value = currentBeat.how_many_beats;
        beatsValue.innerHTML = currentBeat.how_many_beats;
        steps.value = currentBeat.steps_per_beat;
        stepsValue.innerHTML = currentBeat.steps_per_beat;
        tempo.value = currentBeat.tempo;
        tempoValue.innerHTML = currentBeat.tempo;
        Menu.stopPlaying();
        };
    };

for (var a = 0 ; a < beatNames.length ; a++)
    {
    var name = beatNames[ a ];
    var beat = document.createElement( 'span' );

    beat.className = 'button';
    beat.innerHTML = name;
    beat.onclick = loadBeat( name );

    beatsContainer.appendChild( beat );
    }

    // beats per pattern
var beats = container.querySelector( '#BeatsPerPattern' );
var beatsValue = container.querySelector( '#BeatsPerPatternValue' );

beats.value = currentBeat.how_many_beats;
beatsValue.innerHTML = currentBeat.how_many_beats;

beats.onchange = function( event )
    {
    Menu.stopPlaying();
    DrumMachine.setBeatsPerPattern( beats.value );
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


window.Menu = Menu;

}(window));