var BASE_URL = '';


window.onload = function()
{
Audio.load( init, BASE_URL );
};


function init()
{
var play = document.querySelector( '#Play' );
var volume = document.querySelector( '#Volume' );
var volumeValue = document.querySelector( '#VolumeValue' );

var gain = Audio.getGain();

volume.value = gain;
volumeValue.innerHTML = gain;

volume.onchange = function( event )
    {
    Audio.setGain( volume.value );

    volumeValue.innerHTML = volume.value;
    };

play.onclick = function()
    {
    start();
    };
}



function start()
{
var startTime = Audio.getCurrentTime();
var tempo = 80;     // beats per minute
var quarterNoteTime = (60 / tempo);
var eighthNoteTime = quarterNoteTime / 2;
var sixteenthNoteTime = eighthNoteTime / 2;

var bass = Audio.get( 'bass' );
var hi_hat = Audio.get( 'hi_hat' );
var snare = Audio.get( 'snare' );

for (var bar = 0 ; bar < 2 ; bar++)
    {
        // start time + the full bar time
    var time = startTime + bar * 8 * eighthNoteTime;

        // Play the bass drum on beats 1, 5
    Audio.playSound( bass, time );
    Audio.playSound( bass, time + 4 * eighthNoteTime );

        // Play the snare drum on beats 3, 7
    Audio.playSound( snare, time + 2 * eighthNoteTime );
    Audio.playSound( snare, time + 6 * eighthNoteTime );

        // Play the hi-hat every eighth note.
    for (var a = 0 ; a < 8 ; a++)
        {
        Audio.playSound( hi_hat, time + a * eighthNoteTime );
        }
    }
}


