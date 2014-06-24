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

for (var a = 0 ; a < INFO.DIVISIONS ; a++)
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

this.name = name;
this.audio = Audio.get( name );
this.beat = beat;
this.is_muted = false;
this.mute_element = mute;
}


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

var startTime = Audio.getCurrentTime();
var quarterNoteTime = (60 / INFO.TEMPO);
var eighthNoteTime = quarterNoteTime / 2;
var sixteenthNoteTime = eighthNoteTime / 2;

for (var a = 0 ; a < this.beat.length ; a++)
    {
    var position = this.beat[ a ];

    if ( position !== 0 )
        {
        Audio.playSound( this.audio, startTime + a * eighthNoteTime );
        }
    }
};


window.Component = Component;

}(window));