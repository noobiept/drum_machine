/**
 * Return a deep clone of an object.
 */
function deepClone( obj )
{
return JSON.parse( JSON.stringify( obj ) );
}


/**
 * Identifier code of the keyboard keys in a keydown/keyup event (The value of event.keyCode).
 */
var EVENT_KEY = {

    backspace  : 8,
    tab        : 9,
    enter      : 13,
    esc        : 27,
    space      : 32,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    del        : 46,

    "0" : 48,
    "1" : 49,
    "2" : 50,
    "3" : 51,
    "4" : 52,
    "5" : 53,
    "6" : 54,
    "7" : 55,
    "8" : 56,
    "9" : 57,

    a : 65,
    b : 66,
    c : 67,
    d : 68,
    e : 69,
    f : 70,
    g : 71,
    h : 72,
    i : 73,
    j : 74,
    k : 75,
    l : 76,
    m : 77,
    n : 78,
    o : 79,
    p : 80,
    q : 81,
    r : 82,
    s : 83,
    t : 84,
    u : 85,
    v : 86,
    w : 87,
    x : 88,
    y : 89,
    z : 90,

    f1  : 112,
    f2  : 113,
    f3  : 114,
    f4  : 115,
    f5  : 116,
    f6  : 117,
    f7  : 118,
    f8  : 119,
    f9  : 120,
    f10 : 121,
    f11 : 122,
    f12 : 123

};


/**
 * For jquery ajax to work (server only)
 */
jQuery(document).ajaxSend(function(event, xhr, settings) {
function getCookie(name)
    {
    var cookieValue = null;

    if (document.cookie && document.cookie != '')
        {
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++)
            {
            var cookie = jQuery.trim(cookies[i]);

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '='))
                {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
                }
            }
        }

    return cookieValue;
    }


function sameOrigin(url)
    {
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;

    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
    }


function safeMethod(method)
    {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }


if (!safeMethod(settings.type) && sameOrigin(settings.url))
    {
    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
