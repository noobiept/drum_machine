(function(window)
{
function Audio()
{

}

var MANIFEST = null;
var SOUNDS_LOADED = 0;
var CALLBACK = null;

var AUDIO_BUFFERS = {};
var AUDIO_SOURCES = [];
var CONTEXT = null;
var GAIN = 1;

Audio.load = function( callback, baseUrl )
{
var context = getContext();

if ( context == null )
    {
    return;
    }


CONTEXT = context;
CALLBACK = callback;

MANIFEST = [
        { id: 'bass1', src: baseUrl + 'drum_machine/sounds/bass.ogg' },
        { id: 'snare1', src: baseUrl + 'drum_machine/sounds/snare.ogg' },
        { id: 'snare2', src: baseUrl + 'drum_machine/sounds/snare2.ogg' },
        { id: 'hi_hat1', src: baseUrl + 'drum_machine/sounds/cymbal_hi_hat.ogg' },
        { id: 'crash1', src: baseUrl + 'drum_machine/sounds/cymbal_crash.ogg' },
        { id: 'ride1', src: baseUrl + 'drum_machine/sounds/cymbal_ride.ogg' },
        { id: 'splash1', src: baseUrl + 'drum_machine/sounds/cymbal_splash.ogg' },
        { id: 'tom_floor1', src: baseUrl + 'drum_machine/sounds/tom_floor.ogg' },
        { id: 'tom_high1', src: baseUrl + 'drum_machine/sounds/tom_high.ogg' },
        { id: 'tom_low1', src: baseUrl + 'drum_machine/sounds/tom_low.ogg' },
        { id: 'tom_medium1', src: baseUrl + 'drum_machine/sounds/tom_medium.ogg' }
    ];

for (var a = 0 ; a < MANIFEST.length ; a++)
    {
    loadAudio( MANIFEST[ a ].id, MANIFEST[ a ].src );
    }
};



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


function removeAudioSource( event )
{
var source = event.srcElement;

var position = AUDIO_SOURCES.indexOf( source );

AUDIO_SOURCES.splice( position, 1 );
}


Audio.stop = function()
{
for (var a = 0 ; a < AUDIO_SOURCES.length ; a++)
    {
    var source = AUDIO_SOURCES[ a ];

    source.stop();
    }

AUDIO_SOURCES.length = 0;
};




Audio.get = function( sound )
{
return AUDIO_BUFFERS[ sound ];
};


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
    context = null;
    // Web Audio API is not available. Ask the user to use a supported browser.
    }

return context;
}


Audio.getCurrentTime = function()
{
return CONTEXT.currentTime;
};


Audio.setGain = function( gain )
{
GAIN = gain;
};


Audio.getGain = function()
{
return GAIN;
};



window.Audio = Audio;

}(window));