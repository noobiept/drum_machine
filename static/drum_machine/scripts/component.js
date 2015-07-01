(function(window)
{
function Component( name )
{
var _this = this;

var availableSounds = {};

    // get all the sounds of a component (example snare1, snare2, etc)
for(var a = 1 ; ; a++)
    {
    var sound = Audio.get( name + a );

    if ( sound )
        {
        availableSounds[ name + a ] = sound;
        }

    else
        {
        break;
        }
    }

var table = document.querySelector( '#DrumTable' );
var row = document.createElement( 'tr' );
var header = document.createElement( 'th' );

var nameSelector = document.createElement( 'select' );
var soundNames = Object.keys( availableSounds );

for (var a = 0 ; a < soundNames.length ; a++)
    {
    var option = document.createElement( 'option' );

    option.innerHTML = soundNames[ a ];
    option.value = soundNames[ a ];

    nameSelector.appendChild( option );
    }

nameSelector.onchange = function( event )
    {
    var selectedOption = nameSelector.childNodes[ nameSelector.selectedIndex ];

    _this.selected_sound = selectedOption.value;
    };


var mute = document.createElement( 'span' );

mute.innerHTML = 'mute';
mute.className = 'button';
mute.onclick = function() { _this.toggleMute(); };

var volumeInput = document.createElement( 'input' );
var volumeValue = document.createElement( 'span' );

volumeInput.type = 'range';
volumeInput.min = 0;
volumeInput.max = 1.2;
volumeInput.step = 0.1;

var volume = 1;

volumeInput.value = volume;
volumeValue.innerHTML = Number( volume ).toFixed( 1 );

volumeInput.onchange = function( event )
    {
    _this.volume = volumeInput.value;
    };
volumeInput.oninput = function( event )
    {
    volumeValue.innerHTML = Number( volumeInput.value ).toFixed( 1 );
    };

header.appendChild( nameSelector );
header.appendChild( mute );
header.appendChild( volumeInput );
header.appendChild( volumeValue );

table.appendChild( row );

row.className = 'ComponentRow';
row.appendChild( header );


this.selected_sound = name + '1';
this.available_sounds = availableSounds;
this.volume = volume;
this.row = row;
this.name = name;
this.is_muted = false;
this.mute_element = mute;
this.notes_elements = [];   // reference to the 'td' html elements, that represent a note
this.emphasized_element = null; // 'td' html element that is currently on the spotlight
this.beat = [];
}


/**
 * Remove all the notes/positions associated.
 */
Component.prototype.clearBeat = function()
{
for (var a = 0 ; a < this.notes_elements.length ; a++)
    {
    this.row.removeChild( this.notes_elements[ a ] );
    }

this.notes_elements.length = 0;
this.beat.length = 0;
this.emphasized_element = null;
};


/**
 * Add a beat (adds the corresponding table line).
 */
Component.prototype.setBeat = function( beat )
{
this.clearBeat();
var _this = this;
var row = this.row;
var steps = Beats.getCurrent().steps_per_beat;

for (var a = 0 ; a < beat.length ; a++)
    {
    var data = document.createElement( 'td' );

    data.setAttribute( 'data-position', a.toString() );
    data.onclick = function( event ) { _this.togglePosition( event ) };

    if ( beat[ a ] === 0 )
        {
        data.innerHTML = ' ';
        }

    else
        {
        data.innerHTML = 'x';
        }

    if ( a % steps === 0 )
        {
        data.className = 'BeatColumn';
        }

    row.appendChild( data );
    this.notes_elements.push( data );
    }

this.beat = beat;
};


/**
 * Emphasize the current position/note that is being played.
 */
Component.prototype.emphasizePosition = function( position )
{
this.clearEmphasis();

var element = this.notes_elements[ position ];
element.classList.add( 'CurrentNote' );

this.emphasized_element = element;
};


/**
 * Remove the emphasis of the current node being played.
 * This is done when moving to the next note, or when stop playing altogether.
 */
Component.prototype.clearEmphasis = function()
{
if ( this.emphasized_element )
    {
    this.emphasized_element.classList.remove( 'CurrentNote' );
    }

this.emphasized_element = null;
};


/**
 * Add an extra position at the end of the beat/table line.
 */
Component.prototype.addPosition = function()
{
var _this = this;
var data = document.createElement( 'td' );

data.setAttribute( 'data-position', this.beat.length.toString() );
data.onclick = function( event ) { _this.togglePosition( event ) };
data.innerHTML = ' ';

this.beat.push( 0 );

this.row.appendChild( data );
this.notes_elements.push( data );
};


/**
 * Remove the last position of the beat/table line.
 */
Component.prototype.removeLastPosition = function()
{
var row = this.row;

if ( row.childNodes.length > 0 )
    {
    row.removeChild( row.childNodes[ row.childNodes.length - 1 ] );

    this.beat.pop();
    this.notes_elements.pop();
    }
};


/**
 * Toggle a position (to play the sound, or not).
 */
Component.prototype.togglePosition = function( event )
{
var element = event.target;

var position = parseInt( element.getAttribute( 'data-position' ) );

if ( this.beat[ position ] === 0 )
    {
    this.beat[ position ] = 1;
    element.innerHTML = 'x';
    }

else
    {
    this.beat[ position ] = 0;
    element.innerHTML = ' ';
    }

Menu.removeSelectedBeat();
};


/**
 * Toggle the mute state (if it plays this component, or not).
 */
Component.prototype.toggleMute = function()
{
if ( this.is_muted )
    {
    this.is_muted = false;
    this.mute_element.innerHTML = 'mute';
    }

else
    {
    this.is_muted = true;
    this.mute_element.innerHTML = 'un-mute';
    }
};


/**
 * Play the beat associated.
 */
Component.prototype.playSounds = function()
{
if ( this.is_muted )
    {
    return;
    }

var beat = Beats.getCurrent();
var startTime = Audio.getCurrentTime();
var bpm = beat.tempo;

var stepsDuration = {
        '1': 60 / 1 / bpm,      // quarter note
        '2': 60 / 2 / bpm,      // eighth note
        '3': 60 / 3 / bpm,      // triplet-eighth note
        '4': 60 / 4 / bpm,      // sixteenth note
        '5': 60 / 5 / bpm,
        '6': 60 / 6 / bpm       // triplet-sixteenth note
    };

var noteDuration = stepsDuration[ beat.steps_per_beat.toString() ];

for (var a = 0 ; a < this.beat.length ; a++)
    {
    var position = this.beat[ a ];

    if ( position !== 0 )
        {
        Audio.playSound( this.available_sounds[ this.selected_sound ], startTime + a * noteDuration, this.volume );
        }
    }
};


window.Component = Component;
}(window));