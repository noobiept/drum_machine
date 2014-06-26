(function(window)
{
function Beats()
{

}

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
        name: 'beat1'
    },
    blues: {
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
        name: 'blues'
    }
};

var CURRENT_BEAT = deepClone( ALL.blues );

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

window.Beats = Beats;

}(window));