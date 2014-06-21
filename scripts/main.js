var BASE_URL = '';

var TEMPO = 80;
var INTERVAL_F;

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

var isPlaying = false;
play.innerHTML = 'Play';

play.onclick = function()
    {
    if ( isPlaying )
        {
        play.innerHTML = 'Play';
        isPlaying = false;
        stop();
        }

    else
        {
        isPlaying = true;
        play.innerHTML = 'Stop';

        var tempo = TEMPO;

            // bar of 4
        var interval = 60 / tempo * 4 * 1000;

        INTERVAL_F = window.setInterval( start, interval );
        start();
        }
    };
}



function start()
{
var startTime = Audio.getCurrentTime();
var tempo = TEMPO;     // beats per minute
var quarterNoteTime = (60 / tempo);
var eighthNoteTime = quarterNoteTime / 2;
var sixteenthNoteTime = eighthNoteTime / 2;

var bass = Audio.get( 'bass' );
var hi_hat = Audio.get( 'hi_hat' );
var snare = Audio.get( 'snare' );

    // Play the bass drum on beats 1, 5
Audio.playSound( bass, startTime );
Audio.playSound( bass, startTime + 4 * eighthNoteTime );

    // Play the snare drum on beats 3, 7
Audio.playSound( snare, startTime + 2 * eighthNoteTime );
Audio.playSound( snare, startTime + 6 * eighthNoteTime );

    // Play the hi-hat every eighth note.
for (var a = 0 ; a < 8 ; a++)
    {
    Audio.playSound( hi_hat, startTime + a * eighthNoteTime );
    }

}



function stop()
{
window.clearInterval( INTERVAL_F );

Audio.stop();
}

