from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, HttpResponse

import json

import drum_machine.utilities as utilities
from drum_machine.models import Beat

def home( request ):

    context = {

    }

    utilities.get_message( request, context )

    return render( request, 'home.html', context )


def save_beat( request ):

    if not request.user.is_authenticated():
        return HttpResponseBadRequest( 'Need to be authenticated.' )

    if request.method == 'POST':

        beatDescription = request.POST.get( 'description' )
        tempo = request.POST.get( 'tempo' )
        name = request.POST.get( 'name' )

        if not beatDescription or not tempo or not name:
            return HttpResponseBadRequest( 'missing parameters.' )

        beat = Beat( user= request.user, name= name, tempo= tempo, description= beatDescription )
        beat.save()

        return HttpResponse( status= 201 )

    else:
        return HttpResponseBadRequest( 'Only post requests.' )


def load_beat( request ):

    if not request.user.is_authenticated():
        return HttpResponseBadRequest( 'Need to be authenticated.' )

    if request.method == 'POST':

        beats = request.user.beat_set.all()

        response = []

        for beat in beats:
            response.append({
                "name": beat.name,
                "tempo": beat.tempo,
                "description": beat.description
            })

        response = json.dumps( response )

        return HttpResponse( response, content_type= 'application/json' )

    else:
        return HttpResponseBadRequest( 'Only post requests.' )