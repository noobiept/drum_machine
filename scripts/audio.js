(function(window)
{
function Audio()
{

}

var MANIFEST = null;
var SOUNDS_LOADED = 0;
var CALLBACK = null;

var AUDIO_BUFFERS = {};
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
        { id: 'bass', src: baseUrl + 'sounds/bass.wav' },
        { id: 'snare', src: baseUrl + 'sounds/snare.wav' },
        { id: 'hi_hat', src: baseUrl + 'sounds/hi_hat.wav' }
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

Audio.playSound = function( buffer, time )
{
var source = CONTEXT.createBufferSource();
var gainNode = CONTEXT.createGain();

source.buffer = buffer;
gainNode.gain.value = GAIN;

source.connect( gainNode );
gainNode.connect( CONTEXT.destination );

source.start( time );
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