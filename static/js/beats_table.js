window.addEventListener( 'load', function()
{
BeatsTable.init();
});


var BeatsTable;
(function(BeatsTable) {


/**
 * Initialize the beats table.
 */
BeatsTable.init = function()
{
    // add the rate widget
var all = document.querySelectorAll( '.Rate' );

for (var a = all.length - 1 ; a >= 0 ; a--)
    {
    createRate( all[ a ] );
    }

    // set the sort listeners of the table (clicking on the table header)
setSorts();
};


/**
 * Set the click listeners in the table header, to sort the table by that property.
 */
function setSorts()
{
var table = document.querySelector( '#BeatsTable' );

if ( !table )
    {
    return;
    }

var headers = table.querySelectorAll( 'th' );

var click_f = function( position )
    {
    var descending = true;

    return function()
        {
        descending = !descending;

        sortTable( position, descending );
        };
    };

for (var a = headers.length - 1 ; a >= 0 ; a--)
    {
    var header = headers[ a ];

    header.addEventListener( 'click', click_f( a ) );
    }
}


/**
 * Sort the table, based on a column's values.
 */
function sortTable( position, descending )
{
var table = document.querySelector( '#BeatsTable' );
var rows = table.querySelectorAll( 'tr' );
var data = [];
var a;

    // get all the data and reference to the rows
    // 'a' starts at 1 since the first row is the header
for (a = 1 ; a < rows.length ; a++)
    {
    var row = rows[ a ];
    var dataValue = row.children[ position ].getAttribute( 'data-data' );

    if ( typeof dataValue === 'string' )
        {
        dataValue.toLowerCase();
        }

    data.push({
            row: row,
            data: dataValue
        });
    }

    // sort the data
var less = -1;
var high = 1;

if ( descending === true )
    {
    less = 1;
    high = -1;
    }

data.sort( function( a, b )
    {
    var dataA = a.data;
    var dataB = b.data;

    if ( dataA < dataB )
        {
        return less;
        }

    if ( dataA > dataB )
        {
        return high;
        }

    return 0;
    });


    // re-add the rows to the table
for (a = 0 ; a < data.length ; a++)
    {
    table.appendChild( data[ a ].row );
    }
}


/**
 * Rating widget (off the beats).
 */
function createRate( parent )
{
var beatId = parent.getAttribute( 'data-beatId' );
var next = parent.getAttribute( 'data-next' );
var startValue = 3;

var range = document.createElement( 'input' );
var value = document.createElement( 'span' );
var rate = document.createElement( 'a' );

range.type = 'range';
range.min = 0;
range.max = 5;
range.value = startValue;
range.addEventListener( 'input', function()
    {
    value.innerHTML = range.value;
    });
range.addEventListener( 'change', function()
    {
    value.innerHTML = range.value;
    });

value.innerHTML = startValue;

rate.innerHTML = 'Rate!';
rate.href = '/rate_beat/' + beatId + '/';
rate.addEventListener( 'click', function()
    {
    rate.href += range.value + '?next=' + next;
    });

parent.appendChild( range );
parent.appendChild( value );
parent.appendChild( rate );
}


})(BeatsTable || (BeatsTable = {}));