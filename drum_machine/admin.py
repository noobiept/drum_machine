from django.contrib import admin

from drum_machine.models import Beat, Vote


class BeatAdmin( admin.ModelAdmin ):

    list_display = ( 'user', 'name', 'description' )

admin.site.register( Beat, BeatAdmin )


class VoteAdmin( admin.ModelAdmin ):

    list_display = ( 'user', 'beat', 'score' )

admin.site.register( Vote, VoteAdmin )