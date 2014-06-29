from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, HttpResponse

import drum_machine.utilities as utilities
from drum_machine.models import Beat

def home( request ):

    context = {

    }

    utilities.get_message( request, context )

    return render( request, 'home.html', context )


@login_required( login_url= 'accounts:login' )
def save_beat( request ):

    if request.method == 'POST':

        beatDescription = request.POST.get( 'beat' )
        tempo = request.POST.get( 'tempo' )
        name = request.POST.get( 'name' )

        if not beatDescription or not tempo or not name:
            return HttpResponseBadRequest( 'missing parameters.' )

        beat = Beat( user= request.user, name= name, tempo= tempo, description= beatDescription )
        beat.save()

        return HttpResponse( status= 201 )

    else:
        return HttpResponseBadRequest( 'Only post requests.' )