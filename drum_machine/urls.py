from django.conf.urls import patterns, include, url

from django.contrib import admin


urlpatterns = patterns('',

    url( r'^$', 'drum_machine.views.home', name= 'home' ),
    url( r'^beat/(?P<beatId>\w+)$', 'drum_machine.views.open_beat', name= 'open_beat' ),
    url( r'^save_beat$', 'drum_machine.views.save_beat', name= 'save_beat' ),
    url( r'^load_beats$', 'drum_machine.views.load_beats', name= 'load_beats' ),
    url( r'^beats_list$', 'drum_machine.views.beats_list', name= 'beats_list' ),


    url( r'^accounts/', include( 'accounts.urls', namespace= 'accounts', app_name= 'accounts' ) ),


    url( r'^admin/', include( admin.site.urls ) ),
)
