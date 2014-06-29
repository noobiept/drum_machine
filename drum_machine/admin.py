from django.contrib import admin

from drum_machine.models import Beat


class BeatAdmin( admin.ModelAdmin ):

    list_display = ( 'user', 'name', 'tempo', 'description' )

admin.site.register( Beat, BeatAdmin )