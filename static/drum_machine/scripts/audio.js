(function(window)
{
var Audio = {};

var MANIFEST = null;
var SOUNDS_LOADED = 0;
var CALLBACK = null;

var AUDIO_BUFFERS = {};
var AUDIO_SOURCES = [];
var CONTEXT = null;
var GAIN = 1;


/**
 * Load all the audio files necessary for the drum machine.
 */
Audio.load = function( callback, baseUrl )
{
CONTEXT = getContext();
CALLBACK = callback;

MANIFEST = [
        { id: 'bass1', src: baseUrl + 'drum_machine/sounds/bass.ogg' },
        { id: 'bass2', src: baseUrl + 'drum_machine/sounds/bass2.ogg' },
        { id: 'snare1', src: baseUrl + 'drum_machine/sounds/snare.ogg' },
        { id: 'snare2', src: baseUrl + 'drum_machine/sounds/snare2.ogg' },
        { id: 'hi_hat1', src: baseUrl + 'drum_machine/sounds/cymbal_hi_hat.ogg' },
        { id: 'hi_hat2', src: baseUrl + 'drum_machine/sounds/cymbal_hi_hat2.ogg' },
        { id: 'crash1', src: baseUrl + 'drum_machine/sounds/cymbal_crash.ogg' },
        { id: 'crash2', src: baseUrl + 'drum_machine/sounds/cymbal_crash2.ogg' },
        { id: 'ride1', src: baseUrl + 'drum_machine/sounds/cymbal_ride.ogg' },
        { id: 'ride2', src: baseUrl + 'drum_machine/sounds/cymbal_ride2.ogg' },
        { id: 'splash1', src: baseUrl + 'drum_machine/sounds/cymbal_splash.ogg' },
        { id: 'splash2', src: baseUrl + 'drum_machine/sounds/cymbal_splash2.ogg' },
        { id: 'tom_floor1', src: baseUrl + 'drum_machine/sounds/tom_floor.ogg' },
        { id: 'tom_floor2', src: baseUrl + 'drum_machine/sounds/tom_floor2.ogg' },
        { id: 'tom_high1', src: baseUrl + 'drum_machine/sounds/tom_high.ogg' },
        { id: 'tom_high2', src: baseUrl + 'drum_machine/sounds/tom_high2.ogg' },
        { id: 'tom_low1', src: baseUrl + 'drum_machine/sounds/tom_low.ogg' },
        { id: 'tom_low2', src: baseUrl + 'drum_machine/sounds/tom_low2.ogg' },
        { id: 'tom_medium1', src: baseUrl + 'drum_machine/sounds/tom_medium.ogg' },
        { id: 'tom_medium2', src: baseUrl + 'drum_machine/sounds/tom_medium2.ogg' }
    ];

for (var a = 0 ; a < MANIFEST.length ; a++)
    {
    loadAudio( MANIFEST[ a ].id, MANIFEST[ a ].src );
    }
};


/**
 * Load an audio file from a given url.
 */
function loadAudio( id, url )
{
var request = new XMLHttpRequest();

request.open( 'GET', url, true );
request.responseType = 'arraybuffer';

var onError = function() {};

    // Decode asynchronously
request.onload = function()
    {
    CONTEXT.decodeAudioData(request.response, function( buffer )
        {
        AUDIO_BUFFERS[ id ] = buffer;

        SOUNDS_LOADED++;

        if ( SOUNDS_LOADED >= MANIFEST.length )
            {
            if ( CALLBACK )
                {
                CALLBACK();
                }
            }

        }, onError);
    };

request.send();
}


/**
 * Play a sound.
 *
 * @param buffer The audio buffer to play.
 * @param time Time delay until the sound is played.
 * @param gain The gain/volume of the sound (from 0 to 1).
 */
Audio.playSound = function( buffer, time, gain )
{
var source = CONTEXT.createBufferSource();
var gainNode = CONTEXT.createGain();

source.buffer = buffer;
source.onended = removeAudioSource;
gainNode.gain.value = gain;

var globalGain = CONTEXT.createGain();

globalGain.gain.value = GAIN;

source.connect( gainNode );
gainNode.connect( globalGain );
globalGain.connect( CONTEXT.destination );

source.start( time );

AUDIO_SOURCES.push( source );
};


/**
 * Remove an audio source after it has finished playing.
 */
function removeAudioSource( event )
{
var source = event.srcElement;

var position = AUDIO_SOURCES.indexOf( source );

AUDIO_SOURCES.splice( position, 1 );
}


/**
 * Stop playing all the sounds.
 */
Audio.stop = function()
{
for (var a = 0 ; a < AUDIO_SOURCES.length ; a++)
    {
    var source = AUDIO_SOURCES[ a ];

    source.stop();
    }

AUDIO_SOURCES.length = 0;
};


/**
 * Get an audio buffer of a given id.
 */
Audio.get = function( sound )
{
return AUDIO_BUFFERS[ sound ];
};


/**
 * Get the audio context. Throws an exception if it is not available.
 */
function getContext()
{
var contextClass = (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext);

var context;

if ( contextClass )
    {
        // Web Audio API is available.
    context = new contextClass();
    }
else
    {
        // web audio api not available
    throw new Error( 'Web audio api not supported.' );
    }

return context;
}


/**
 * Returns the current time (reference time for playing the sounds).
 */
Audio.getCurrentTime = function()
{
return CONTEXT.currentTime;
};


/**
 * Set the global gain/volume of the application.
 */
Audio.setGain = function( gain )
{
GAIN = gain;
};


/**
 * Get the current global gain/volume set.
 */
Audio.getGain = function()
{
return GAIN;
};


window.Audio = Audio;
}(window));