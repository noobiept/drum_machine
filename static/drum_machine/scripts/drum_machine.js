(function(window)
{
function DrumMachine()
{

}

var INTERVAL_F;
var INDIVIDUAL_NOTE_F;

var SAVE_MESSAGE = null;

var COMPONENTS = [];


DrumMachine.init = function()
{
Beats.init();

var componentsInfo = [
     'crash', 'splash', 'ride',
     'hi_hat', 'snare', 'tom_high',
     'tom_medium', 'tom_low', 'bass'
    ];
var beat = Beats.getCurrent();

for (var a = 0 ; a < componentsInfo.length ; a++)
    {
    var name = componentsInfo[ a ];

    COMPONENTS.push( new Component( name, beat[ name ] ) );
    }

var beatLength = beat.how_many_beats * beat.steps_per_beat;
var table = document.querySelector( '#DrumTable' );
var row = document.createElement( 'tr' );
var th = document.createElement( 'th' );

row.className = 'PlayingStatus';
row.appendChild( th );

for (var a = 0 ; a < beatLength ; a++)
    {
    var td = document.createElement( 'td' );

    row.appendChild( td );
    }

table.appendChild( row );

window.onkeyup = keyboardShortcuts;

var saveContainer = document.querySelector( '#SaveBeatContainer' );

if ( saveContainer )
    {
    SAVE_MESSAGE = new Message( saveContainer );
    }

Menu.init();
};


function start()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].playSounds();
    }
}


DrumMachine.playAgain = function()
{
DrumMachine.stop();

var beat = Beats.getCurrent();

var interval = 60 / beat.tempo * beat.how_many_beats * 1000;

var position = 0;
var totalNotes = beat.how_many_beats * beat.steps_per_beat;
var current = null;

var emphasizeCurrentNote = function()
    {
        // it starts at 1, and there's the th as well, so +2
    var childPosition = position + 2;
    var element = document.querySelector( '.PlayingStatus td:nth-child(' + childPosition + ')' );

    if ( current )
        {
        current.classList.remove( 'CurrentNote' );
        }

    element.classList.add( 'CurrentNote' );
    current = element;

    position++;

    if ( position >= totalNotes )
        {
        position = 0;
        }
    };

INTERVAL_F = window.setInterval( start, interval );
INDIVIDUAL_NOTE_F = window.setInterval( emphasizeCurrentNote, interval / totalNotes );

    // start right away
emphasizeCurrentNote();
start();
};


DrumMachine.stop = function()
{
window.clearInterval( INTERVAL_F );
window.clearInterval( INDIVIDUAL_NOTE_F );

var playing = document.querySelector( '.CurrentNote' );

if ( playing )
    {
    playing.classList.remove( 'CurrentNote' );
    }

Audio.stop();
};


DrumMachine.selectBeat = function( beatName )
{
var beat = Beats.setCurrent( beatName );

if ( beat === null )
    {
    return;
    }

for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    var component = COMPONENTS[ a ];

    component.setBeat( beat[ component.name ] );
    }

var playing = document.querySelector( '.PlayingStatus' );
var nodes = playing.childNodes;
var beatLength = beat.how_many_beats * beat.steps_per_beat;

    // -1 because of the th
while ( nodes.length - 1 !== beatLength )
    {
    if ( nodes.length - 1 < beatLength )
        {
        addPlayingStatusPosition();
        }

    else
        {
        removePlayingStatusPosition();
        }
    }
};



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

/*
    Re-sets the css class on the first column of a new beat
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


function addPosition()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].addPosition();
    }

addPlayingStatusPosition();
}



function removeLastPosition()
{
for (var a = 0 ; a < COMPONENTS.length ; a++)
    {
    COMPONENTS[ a ].removeLastPosition();
    }

removePlayingStatusPosition();
}



function addPlayingStatusPosition()
{
var playing = document.querySelector( '.PlayingStatus' );
var td = document.createElement( 'td' );

playing.appendChild( td );
}


function removePlayingStatusPosition()
{
var playing = document.querySelector( '.PlayingStatus' );

playing.removeChild( playing.childNodes[ playing.childNodes.length - 1 ] );
}


DrumMachine.setBeatsPerPattern = function( howMany )
{
DrumMachine.stop();

var beat = Beats.getCurrent();

setBeatLength( howMany * beat.steps_per_beat );

beat.how_many_beats = howMany;

setBeatCssClass( beat );
};


DrumMachine.setStepsPerBeat = function( howMany )
{
DrumMachine.stop();

var beat = Beats.getCurrent();

setBeatLength( beat.how_many_beats * howMany );

beat.steps_per_beat = howMany;

setBeatCssClass( beat );
};


DrumMachine.saveBeat = function( name )
{
var pattern = /\s*\w+\s*/;

if ( !pattern.test( name ) )
    {
    SAVE_MESSAGE.show( 'Need to add a name.' );
    return;
    }

var currentBeat = Beats.getCurrent();

currentBeat.name = name;

var clone = deepClone( currentBeat );

var beatDescription = {
    description: JSON.stringify( currentBeat ),
    name: name
};

SAVE_MESSAGE.show( 'Saving..' );

$.ajax({
        url: '/save_beat',
        type: 'POST',
        data: beatDescription,
        error: function( jqXHR, textStatus, errorThrown )
            {
            SAVE_MESSAGE.show( jqXHR.responseText );
            console.log( jqXHR.responseText, textStatus, errorThrown );
            },
        success: function( data, textStatus, jqXHR )
            {
            SAVE_MESSAGE.show( name + ' beat saved' );

            var container = document.querySelector( '#CustomBeatsContainer' );

            Beats.add( clone );
            Menu.addBeat( name, container );
            }
    });
};


window.DrumMachine = DrumMachine;

}(window));