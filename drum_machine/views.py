from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.core.urlresolvers import reverse

import json

import drum_machine.utilities as utilities
from drum_machine.models import Beat, Vote


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


"""
    Receives data in this format.

    data = {
        beats: [
            { 'name': str, 'description': str },
            # etc
        ]
    }
"""
def save_beat( request ):

    if not request.user.is_authenticated():
        return HttpResponseBadRequest( 'Need to be authenticated.' )

    if request.method == 'POST':

        beats = request.POST.get( 'beats' )

        if not beats:
            return HttpResponseBadRequest( "Need 'beats' data." )

        try:
            beats = json.loads( beats )

        except ValueError:
            return HttpResponseBadRequest( "Invalid 'beats' format." )


        count = 0   # number of beats saved

        for beat in beats:
            name = beat.get( 'name' )
            description = beat.get( 'description' )

            if not description or not name:
                continue

                # check if there's a beat with the same name
            try:
                request.user.beat_set.get( name= name )

            except Beat.DoesNotExist:

                count += 1
                beat = Beat( user= request.user, name= name, description= description )
                beat.save()


        response = {
            'count': count
        }

        return JsonResponse( response )


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

    utilities.get_message( request, context )

    return render( request, 'beats_list.html', context )


@login_required
def remove_beat( request, beatId ):

    try:
        beat = request.user.beat_set.get( id= beatId )

    except Beat.DoesNotExist:
        raise Http404( "Didn't found that beat." )

    else:
        beat.delete()
        utilities.set_message( request, 'Beat deleted.' )

        redirect = request.GET.get( 'next', '/' )

        return HttpResponseRedirect( redirect )


@login_required
def rate_beat( request, beatId, rateValue ):

    try:
        beat = Beat.objects.get( id= beatId )

    except Beat.DoesNotExist:
        raise Http404( "Beat not found." )

    else:
        rateValue = int( rateValue )

        if rateValue < 0 or rateValue > 5:
            return HttpResponseBadRequest( 'Rating needs to be between 0 and 5.' )

            # check if this user has already rated the beat before
        try:
            vote = Vote.objects.get( user= request.user, beat= beat )

            # first time voting
        except Vote.DoesNotExist:
            vote = Vote( user= request.user, beat= beat, score= rateValue )
            vote.save()

            # change the rating
        else:
            vote.score = rateValue
            vote.save()


        utilities.set_message( request, 'Rate completed.' )

        redirect = request.GET.get( 'next', '/' )

        return HttpResponseRedirect( redirect )