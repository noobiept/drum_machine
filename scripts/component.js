(function(window)
{
function Component( name, beat )
{
this.name = name;
this.audio = Audio.get( name );
this.beat = beat;
}

Component.setBeat = function( beat )
{
this.beat = beat;
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