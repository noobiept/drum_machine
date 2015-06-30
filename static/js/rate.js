window.addEventListener( 'load', function()
{
var all = document.querySelectorAll( '.Rate' );

for (var a = all.length - 1 ; a >= 0 ; a--)
    {
    createRate( all[ a ] );
    }
});


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