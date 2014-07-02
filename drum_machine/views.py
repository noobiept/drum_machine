from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, HttpResponse, Http404

import json

import drum_machine.utilities as utilities
from drum_machine.models import Beat

def home( request ):

    context = {

    }

    utilities.get_message( request, context )

    return render( request, 'home.html', context )


def open_beat( request, beatId ):

    try:
        beat = Beat.objects.get( id= beatId )

    except Beat.DoesNotExist:
        raise Http404

    else:

        context = {
            'beat': beat
        }

        return render( request, 'open_beat.html', context )


def save_beat( request ):

    if not request.user.is_authenticated():
        return HttpResponseBadRequest( 'Need to be authenticated.' )

    if request.method == 'POST':

        beatDescription = request.POST.get( 'description' )
        name = request.POST.get( 'name' )

        if not beatDescription or not name:
            return HttpResponseBadRequest( 'missing parameters.' )

            # check if there's a beat with the same name
        try:
            request.user.beat_set.get( name= name )

        except Beat.DoesNotExist:

            beat = Beat( user= request.user, name= name, description= beatDescription )
            beat.save()

            return HttpResponse( status= 201 )

        else:
            return HttpResponseBadRequest( 'A beat with that name already exist (try a different name).' )

    else:
        return HttpResponseBadRequest( 'Only post requests.' )


def load_beats( request ):

    if not request.user.is_authenticated():
        return HttpResponseBadRequest( 'Need to be authenticated.' )

    if request.method == 'POST':

        beats = request.user.beat_set.all()

        response = []

        for beat in beats:
            response.append({
                "name": beat.name,
                "description": beat.description
            })

        response = json.dumps( response )

        return HttpResponse( response, content_type= 'application/json' )

    else:
        return HttpResponseBadRequest( 'Only post requests.' )


def beats_list( request ):

    allBeats = Beat.objects.order_by( '-date_created' )

    context = {
        'beats': allBeats
    }

    return render( request, 'beats_list.html', context )