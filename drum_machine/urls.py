from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    url( r'^$', 'drum_machine.views.home', name= 'home' ),
    url( r'^save_beat$', 'drum_machine.views.save_beat', name= 'save_beat' ),

    url( r'^accounts/', include( 'accounts.urls', namespace= 'accounts', app_name= 'accounts' ) ),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url( r'^admin/', include( admin.site.urls ) ),
)
