(function(window)
{
function Component( name, beat, row )
{
var _this = this;
this.name = name;
this.audio = Audio.get( name );
this.beat = beat;
this.row = row;

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


Component.prototype.playSounds = function()
{
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