(function(window)
{
function Component( name, beat )
{
var _this = this;

var table = document.querySelector( '#DrumTable' );
var row = document.createElement( 'tr' );
var header = document.createElement( 'th' );

header.innerHTML = name + ' ';

var mute = document.createElement( 'span' );

mute.innerHTML = 'mute';
mute.className = 'button';
mute.onclick = function() { _this.toggleMute(); };

header.appendChild( mute );

table.appendChild( row );

row.className = 'ComponentRow';
row.appendChild( header );

this.row = row;
this.name = name;
this.audio = Audio.get( name );
this.is_muted = false;
this.mute_element = mute;

this.setBeat( beat );
}

Component.prototype.clearBeat = function()
{
var td = this.row.querySelectorAll( 'td' );

for (var a = 0 ; a < td.length ; a++)
    {
    this.row.removeChild( td[ a ] );
    }

this.beat = [];
};


Component.prototype.setBeat = function( beat )
{
this.clearBeat();
var _this = this;
var row = this.row;

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

    row.appendChild( data );
    }

this.beat = beat;
};


Component.prototype.addPosition = function()
{
var _this = this;

var data = document.createElement( 'td' );

data.setAttribute( 'data-position', this.beat.length.toString() );
data.onclick = function( event ) { _this.togglePosition( event ) };
data.innerHTML = ' ';

this.beat.push( 0 );

this.row.appendChild( data );
};

Component.prototype.removeLastPosition = function()
{
var row = this.row;

if ( row.childNodes.length > 0 )
    {
    row.removeChild( row.childNodes[ row.childNodes.length - 1 ] );

    this.beat.pop();
    }

};



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
};


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


Component.prototype.playSounds = function()
{
if ( this.is_muted )
    {
    return;
    }

var beat = Beats.getCurrent();
var startTime = Audio.getCurrentTime();
var bpm = INFO.TEMPO;

var stepsDuration = {
        '2': 30 / bpm,      // eighth note
        '3': 20 / bpm       // triplet-eighth note
    };

var noteDuration = stepsDuration[ beat.steps_per_beat.toString() ];

for (var a = 0 ; a < this.beat.length ; a++)
    {
    var position = this.beat[ a ];

    if ( position !== 0 )
        {
        Audio.playSound( this.audio, startTime + a * noteDuration );
        }
    }
};


window.Component = Component;

}(window));