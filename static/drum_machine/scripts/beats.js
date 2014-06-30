(function(window)
{
function Beats()
{

}

Beats.init = function()
{
$.ajax({
        url: '/load_beat',
        type: 'POST',
        error: function( jqXHR, textStatus, errorThrown )
            {
            console.log( textStatus, errorThrown );
            },
        success: function( data, textStatus, jqXHR )
            {
            if ( !_.isArray( data ) )
                {
                console.log( 'error loading beats, data not an array.' );
                return;
                }

            try {
                for (var a = 0 ; a < data.length ; a++)
                    {
                    data[ a ].description = JSON.parse( data[ a ].description );
                    }
            }

            catch( error )
                {
                console.log('ERROR:', error);
                return;
                }

            var container = document.querySelector( '#CustomBeatsContainer' );


            for (var a = 0 ; a < data.length ; a++)
                {
                var beat = data[ a ];

                var description = beat.description;

                Beats.add( description );
                Menu.addBeat( description.name, container );
                }
            }
    });
};

var ALL = {
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

var CURRENT_BEAT = deepClone( ALL.beat1 );

Beats.getNames = function()
{
return _.keys( ALL );
};

Beats.getCurrent = function()
{
return CURRENT_BEAT;
};


Beats.setCurrent = function( name )
{
var beat = ALL[ name ];

if ( beat )
    {
    CURRENT_BEAT = deepClone( ALL[ name ] );

    return CURRENT_BEAT;
    }

else
    {
    return null;
    }
};

Beats.add = function( beat )
{
ALL[ beat.name ] = beat;
};


window.Beats = Beats;

}(window));