(function(window)
{
function Message( container )
{
var element = document.createElement( 'span' );

container.appendChild( element );

this.container = container;
this.element = element;
this.timeout_f = 0;
this.is_opened = false;
}


Message.prototype.show = function( text )
{
var _this = this;

if ( this.is_opened )
    {
    window.clearTimeout( this.timeout_f );
    }

this.is_opened = true;
this.element.innerHTML = text;

this.timeout_f = window.setTimeout( function() { _this.hide(); }, 1000 );
};

Message.prototype.hide = function()
{
this.is_opened = false;
this.element.innerHTML = '';
};

Message.prototype.remove = function()
{
this.container.removeChild( this.element );
};

window.Message = Message;

}(window));