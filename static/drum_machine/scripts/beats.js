(function(window)
{
var Beats = {};

var EXAMPLE_BEATS = {
    beat1: {
        crash      : [ 1, 0, 0, 0, 1, 0, 0, 0 ],
        splash     : [ 0, 0, 0, 1, 0, 0, 0, 1 ],
        ride       : [ 1, 0, 1, 0, 1, 0, 1, 0 ],
        hi_hat     : [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        snare      : [ 0, 0, 1, 0, 0, 0, 1, 0 ],
        tom_high   : [ 1, 0, 0, 0, 0, 0, 0, 0 ],
        tom_medium : [ 0, 1, 0, 0, 0, 0, 0, 0 ],
        tom_low    : [ 0, 0, 0, 0, 0, 0, 0, 1 ],
        bass       : [ 1, 0, 0, 0, 1, 0, 0, 0 ],

        how_many_beats: 4,
        steps_per_beat: 2,
        tempo: 80,
        name: 'beat1'
    },
    beat2: {
        crash      : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        splash     : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ride       : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        hi_hat     : [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
        snare      : [ 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0 ],
        tom_high   : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_medium : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_low    : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        bass       : [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],

        how_many_beats: 4,
        steps_per_beat: 4,
        tempo: 100,
        name: 'beat2'
    },
    beat3: {
        crash      : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        splash     : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ride       : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        hi_hat     : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        snare      : [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
        tom_high   : [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_medium : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
        tom_low    : [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
        bass       : [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0 ],

        how_many_beats: 4,
        steps_per_beat: 4,
        tempo: 85,
        name: 'beat3'
    },
    beat4: {
        crash      : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        splash     : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ride       : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        hi_hat     : [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
        snare      : [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 ],
        tom_high   : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_medium : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_low    : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        bass       : [ 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0 ],

        how_many_beats: 4,
        steps_per_beat: 4,
        tempo: 110,
        name: 'beat4'
    },
    beat5: {
        crash      : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        splash     : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ride       : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        hi_hat     : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        snare      : [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
        tom_high   : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_medium : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        tom_low    : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        bass       : [ 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0 ],

        how_many_beats: 4,
        steps_per_beat: 3,
        tempo: 70,
        name: 'beat5'
    }
};
var ALL_BEATS = {};         // all the loaded beats
var CURRENT_BEAT = null;    // current active beat


/**
 * Load the saved beats, and determine the starting beat (that is selected).
 */
Beats.init = function()
{
    // load the user's beats
    // if there's no one logged in, then use the example beats
var container = document.querySelector( '#BeatsContainer' );

var loading = document.createElement( 'span' );
loading.innerHTML = 'loading..';

container.appendChild( loading );

$.ajax({
    url: '/load_beats',
    type: 'POST',
    error: function( jqXHR, textStatus, errorThrown )
        {
        console.log( jqXHR.responseText, textStatus, errorThrown );
        container.removeChild( loading );

            // fail to load, so just add the example beats
        Beats.addExampleBeats();
        DrumMachine.selectStartingBeat();
        },
    success: function( data, textStatus, jqXHR )
        {
        container.removeChild( loading );

        if ( !Array.isArray( data ) )
            {
            console.log( 'error loading beats, data not an array.' );
            return;
            }


            // there are no beats saved, add the example beats
        if ( data.length === 0 )
            {
            Beats.addExampleBeats();
            Beats.saveExampleBeats();
            DrumMachine.selectStartingBeat();
            return;
            }


            // parse the beats
        try {
            for (var a = 0 ; a < data.length ; a++)
                {
                data[ a ].description = JSON.parse( data[ a ].description );
                }
        }

        catch( error )
            {
            console.log( 'ERROR:', error );
            return;
            }


            // add the beats loaded
        for (var a = 0 ; a < data.length ; a++)
            {
            var beat = data[ a ];

            Beats.add( beat.description );
            }

        DrumMachine.selectStartingBeat();
        }
    });
};


/**
 * Add the example beats to the list of beats available.
 * This is done either when the user isn't logged in, or when he doesn't have any beats currently.
 */
Beats.addExampleBeats = function()
{
var exampleNames = Object.keys( EXAMPLE_BEATS );

for (var a = 0 ; a < exampleNames.length ; a++)
    {
    var name = exampleNames[ a ];
    Beats.add( EXAMPLE_BEATS[ name ] );
    }
};


/**
 * When a user doesn't have any beats, we add to his account the example beats (to serve as a base for his own).
 */
Beats.saveExampleBeats = function()
{
var beats = [
        { name: 'beat1', description: JSON.stringify( EXAMPLE_BEATS[ 'beat1' ] ) },
        { name: 'beat2', description: JSON.stringify( EXAMPLE_BEATS[ 'beat2' ] ) },
        { name: 'beat3', description: JSON.stringify( EXAMPLE_BEATS[ 'beat3' ] ) },
        { name: 'beat4', description: JSON.stringify( EXAMPLE_BEATS[ 'beat4' ] ) },
        { name: 'beat5', description: JSON.stringify( EXAMPLE_BEATS[ 'beat5' ] ) }
    ];


$.ajax({
        url: '/save_beat',
        type: 'POST',
        data: { beats: JSON.stringify( beats ) },
        dataType: 'json'
    });
};


/**
 * Get a list of names of the beats that are currently loaded.
 */
Beats.getNames = function()
{
return Object.keys( ALL_BEATS );
};


/**
 * Get current beat info.
 */
Beats.getCurrent = function()
{
return CURRENT_BEAT;
};


/**
 * Set a beat as the current one, and return the beat info.
 */
Beats.setCurrent = function( name )
{
var beat = ALL_BEATS[ name ];

if ( beat )
    {
    CURRENT_BEAT = deepClone( ALL_BEATS[ name ] );

    return CURRENT_BEAT;
    }

else
    {
    return null;
    }
};


/**
 * Add a beat to the available beats list.
 */
Beats.add = function( beat )
{
var name = beat.name;


var previous = ALL_BEATS[ name ];

    // check if we're changing an existing beat, or add a new one
    // only need to add a new beat to the menu if it is indeed a new one
if ( !previous )
    {
    Menu.addBeat( beat.name );
    }

ALL_BEATS[ name ] = beat;
};


window.Beats = Beats;
}(window));