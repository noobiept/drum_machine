(function(window)
{
function DrumMachine()
{

}

var IS_PLAYING = false;
var INTERVAL_F;
var INDIVIDUAL_NOTE_F;
var MAX_NAME = 25;      // maximum number of characters that a beat name can have

var SAVE_MESSAGE = null;
var COMPONENTS = [];


/**
 * Initialize the drum machine application.
 */
DrumMachine.init = function()
{
    // add the drum components
var componentsInfo = [
     'crash', 'splash', 'ride',
     'hi_hat', 'snare', 'tom_high',
     'tom_medium', 'tom_low', 'bass'
    ];

for (var a = 0 ; a < componentsInfo.length ; a++)
    {
    var name = componentsInfo[ a ];

    COMPONENTS.push( new Component( name ) );
    }


    // set the keyboard shortcuts
window.onkeyup = keyboardShortcuts;

var saveContainer = document.querySelector( '#SaveBeatContainer' );

if ( saveContainer )
    {
    SAVE_MESSAGE = new Message( saveContainer );
    }


Menu.init();
Beats.init();
};


/**
 * Start playing the beat sounds.
 */
function start()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].playSounds();
    }
}


/**
 * Change to the other state. If the drum machine is playing, then we stop it. If its stopped then we start playing.
 */
DrumMachine.alternatePlayState = function()
{
if ( IS_PLAYING )
    {
    DrumMachine.stop();
    }

else
    {
    DrumMachine.startPlayLoop();
    }
};


/**
 * Start playing the beat in a loop.
 */
DrumMachine.startPlayLoop = function()
{
DrumMachine.stop();

var beat = Beats.getCurrent();
var interval = 60 / beat.tempo * beat.how_many_beats * 1000;

var playPosition = 0;
var totalNotes = beat.how_many_beats * beat.steps_per_beat;

    // emphasize the column that is being currently played
var emphasizeCurrentNote = function()
    {
    for (var a = COMPONENTS.length - 1 ; a >= 0 ; a--)
        {
        COMPONENTS[ a ].emphasizePosition( playPosition );
        }

    playPosition++;

    if ( playPosition >= totalNotes )
        {
        playPosition = 0;
        }
    };

INTERVAL_F = window.setInterval( start, interval );
INDIVIDUAL_NOTE_F = window.setInterval( emphasizeCurrentNote, interval / totalNotes );

    // start right away
emphasizeCurrentNote();
start();

IS_PLAYING = true;
Menu.setPlayState( IS_PLAYING );
};


/**
 * Stop playing the current beat.
 */
DrumMachine.stop = function()
{
if ( !IS_PLAYING )
    {
    return;
    }

IS_PLAYING = false;

window.clearInterval( INTERVAL_F );
window.clearInterval( INDIVIDUAL_NOTE_F );


for (var a = COMPONENTS.length - 1 ; a >= 0 ; a--)
    {
    COMPONENTS[ a ].clearEmphasis();
    }

Audio.stop();
Menu.setPlayState( IS_PLAYING );
};


/**
 * Load a specific beat (set by 'STARTING_BEAT_ID'), or simply load one of the beats available.
 */
DrumMachine.selectStartingBeat = function()
{
if ( window.STARTING_BEAT_ID !== null )
    {
    $.ajax({
        url: '/get_beat/' + window.STARTING_BEAT_ID,
        type: 'GET',
        error: function( jqXHR, textStatus, errorThrown )
            {
            console.log( jqXHR.responseText, textStatus, errorThrown );
            SAVE_MESSAGE.show( 'Failed to load the beat.' );

                // load one of the available beats instead
            var names = Beats.getNames();

            DrumMachine.selectBeat( names[ 0 ] );
            },
        success: function( data, textStatus, jqXHR )
            {
            var description = JSON.parse( data );

            Beats.add( description );
            DrumMachine.selectBeat( description.name );
            }
        });
    }

else
    {
    var names = Beats.getNames();

    DrumMachine.selectBeat( names[ 0 ] );
    }
};


/**
 * Add to the drum machine a beat (so that it can be played/changed/etc).
 */
DrumMachine.selectBeat = function( beatName )
{
var beat = Beats.setCurrent( beatName );

if ( beat === null )
    {
    console.log( 'Failed to select a beat: ' + beatName );
    return;
    }

for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    var component = COMPONENTS[ a ];

    component.setBeat( beat[ component.name ] );
    }

    // update the menu
    // select the beat name in the beats list
Menu.selectBeat( beatName );
};


/**
 * Change the beat length (how many notes).
 */
function setBeatLength( nextLength )
{
var beat = Beats.getCurrent();
var currentLength = beat.how_many_beats * beat.steps_per_beat;
var difference = currentLength - nextLength;

while ( difference != 0 )
    {
    if ( difference < 0 )
        {
        addPosition();
        difference++;
        }

    else if ( difference > 0 )
        {
        removeLastPosition();
        difference--;
        }
    }
}


/**
 * Re-sets the css class on the columns of the stressed notes.
 */
function setBeatCssClass( beat )
{
var steps = beat.steps_per_beat;

for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    var component = COMPONENTS[ a ];

    var td = component.row.querySelectorAll( 'td' );

    for (var b = 0 ; b < td.length ; b++)
        {
        if ( b % steps === 0 )
            {
            td[ b ].className = 'BeatColumn';
            }

        else
            {
            td[ b ].className = '';
            }
        }
    }
}


/**
 * Add a new position at the end of the beat.
 */
function addPosition()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].addPosition();
    }
}


/**
 * Remove the last position of the beat.
 */
function removeLastPosition()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].removeLastPosition();
    }
}


/**
 * Set the beats per pattern (number of divisions within the beat).
 */
DrumMachine.setBeatsPerPattern = function( howMany )
{
DrumMachine.stop();

var beat = Beats.getCurrent();

setBeatLength( howMany * beat.steps_per_beat );

beat.how_many_beats = howMany;

setBeatCssClass( beat );
};


/**
 * Set the steps per beat (notes per division).
 */
DrumMachine.setStepsPerBeat = function( howMany )
{
DrumMachine.stop();

var beat = Beats.getCurrent();

setBeatLength( beat.how_many_beats * howMany );

beat.steps_per_beat = howMany;

setBeatCssClass( beat );
};


/**
 * Save the current beat to the server.
 */
DrumMachine.saveBeat = function( name )
{
var pattern = /\s*\w+\s*/;

if ( !pattern.test( name ) )
    {
    SAVE_MESSAGE.show( 'Need to add a name.' );
    return;
    }

if ( name.length > MAX_NAME )
    {
    SAVE_MESSAGE.show( "Can't have a name with so many characters (max: " + MAX_NAME + ').' );
    return;
    }


var currentBeat = Beats.getCurrent();

currentBeat.name = name;

var clone = deepClone( currentBeat );

var beats = [
        { name: name, description: JSON.stringify( currentBeat ) }
    ];


SAVE_MESSAGE.show( 'Saving..' );

$.ajax({
        url: '/save_beat',
        type: 'POST',
        data: { beats: JSON.stringify( beats ) },
        error: function( jqXHR, textStatus, errorThrown )
            {
            SAVE_MESSAGE.show( jqXHR.responseText );
            console.log( jqXHR.responseText, textStatus, errorThrown );
            },
        success: function( data, textStatus, jqXHR )
            {
            SAVE_MESSAGE.show( 'beat saved: ' + name );

            Beats.add( clone );
            Menu.selectBeat( name );
            }
    });
};


window.DrumMachine = DrumMachine;
}(window));