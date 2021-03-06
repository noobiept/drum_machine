(function(window)
{
var Menu = {};

var PLAY_ELEMENT = null;
var BEATS_ELEMENT = null;
var BEATS_VALUE_ELEMENT = null;
var STEPS_ELEMENT = null;
var STEPS_VALUE_ELEMENT = null;
var TEMPO_ELEMENT = null;
var TEMPO_VALUE_ELEMENT = null;
var SELECTED_BEAT = null;       // reference to the html element of the current selected beat (or null if its a custom beat)
var BEATS_CONTAINER = null;


/**
 * Initialization of the menu.
 */
Menu.init = function()
{
var container = document.querySelector( '#DrumMenu' );

    // play button
var play = container.querySelector( '#Play' );

play.innerHTML = 'Play';
play.onclick = DrumMachine.alternatePlayState;


    // volume
var volume = container.querySelector( '#Volume' );
var volumeValue = container.querySelector( '#VolumeValue' );

var gain = Audio.getGain();

volume.value = gain;
volumeValue.innerHTML = Number( gain ).toFixed( 1 );

volume.onchange = function( event )
    {
    Audio.setGain( volume.value );
    };
volume.oninput = function()
    {
    volumeValue.innerHTML = Number( volume.value ).toFixed( 1 );
    };


    // tempo
var tempo = container.querySelector( '#Tempo' );
var tempoValue = container.querySelector( '#TempoValue' );

tempo.onchange = function( event )
    {
    Beats.getCurrent().tempo = tempo.value;

    DrumMachine.stop();
    };
tempo.oninput = function( event )
    {
    tempoValue.innerHTML = tempo.value;
    };


    // beats per pattern
var beats = container.querySelector( '#BeatsPerPattern' );
var beatsValue = container.querySelector( '#BeatsPerPatternValue' );

beats.onchange = function( event )
    {
    DrumMachine.stop();
    DrumMachine.setBeatsPerPattern( beats.value );
    Menu.removeSelectedBeat();
    };
beats.oninput = function( event )
    {
    beatsValue.innerHTML = beats.value;
    };


    // steps per beat
var steps = container.querySelector( '#StepsPerBeat' );
var stepsValue = container.querySelector( '#StepsPerBeatValue' );

steps.onchange = function( event )
    {
    DrumMachine.stop();
    DrumMachine.setStepsPerBeat( steps.value );
    Menu.removeSelectedBeat();
    };
steps.oninput = function( event )
    {
    stepsValue.innerHTML = steps.value;
    };

container.style.display = 'block';


    // beats container
BEATS_CONTAINER = container.querySelector( '#BeatsContainer' );


    // save beat
var save = container.querySelector( '#SaveBeat' );

if ( save )
    {
    var beatName = container.querySelector( '#BeatName' );

    var save_f = function()
        {
        DrumMachine.saveBeat( beatName.value );
        };

    save.addEventListener( 'click', save_f );
    beatName.addEventListener( 'keyup', function( event )
        {
        if ( event.keyCode === EVENT_KEY.enter )
            {
            save_f();
            }
        });
    }


    // save references to the html elements
PLAY_ELEMENT = play;
BEATS_ELEMENT = beats;
BEATS_VALUE_ELEMENT = beatsValue;
STEPS_ELEMENT = steps;
STEPS_VALUE_ELEMENT = stepsValue;
TEMPO_ELEMENT = tempo;
TEMPO_VALUE_ELEMENT = tempoValue;
};


/**
 * Update the menu controls, according to the drum machine's current state.
 */
Menu.setPlayState = function( isPlaying )
{
if ( isPlaying )
    {
    PLAY_ELEMENT.innerHTML = 'Stop';
    }

else
    {
    PLAY_ELEMENT.innerHTML = 'Play';
    }
};


/**
 * Remove the selected beat highlight.
 */
Menu.removeSelectedBeat = function()
{
if ( SELECTED_BEAT )
    {
    SELECTED_BEAT.classList.remove( 'selected' );
    SELECTED_BEAT = null;
    }
};


/**
 * Select a beat name element in the beats list, and updates the menu controls according to the current beat.
 */
Menu.selectBeat = function( beatName )
{
Menu.removeSelectedBeat();

    // find the html element
var beatElement;

for (var a = BEATS_CONTAINER.children.length - 1 ; a >= 0 ; a--)
    {
    beatElement = BEATS_CONTAINER.children[ a ];

    if ( beatElement.innerHTML === beatName )
        {
        break;
        }
    }


    // new selected beat
beatElement.classList.add( 'selected' );
SELECTED_BEAT = beatElement;

    // update the menu with the correct values
var currentBeat = Beats.getCurrent();

BEATS_ELEMENT.value           = currentBeat.how_many_beats;
BEATS_VALUE_ELEMENT.innerHTML = currentBeat.how_many_beats;
STEPS_ELEMENT.value           = currentBeat.steps_per_beat;
STEPS_VALUE_ELEMENT.innerHTML = currentBeat.steps_per_beat;
TEMPO_ELEMENT.value           = currentBeat.tempo;
TEMPO_VALUE_ELEMENT.innerHTML = currentBeat.tempo;
DrumMachine.stop();
};


/**
 * Add a beat to the beat list. On click on that element it loads that particular beat.
 */
Menu.addBeat = function( name )
{
var beat = document.createElement( 'span' );

beat.className = 'button';
beat.innerHTML = name;
beat.onclick = function()
    {
    DrumMachine.selectBeat( name );
    };

BEATS_CONTAINER.appendChild( beat );
};


window.Menu = Menu;
}(window));