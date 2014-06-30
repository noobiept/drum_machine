from django.db import models
from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils import timezone

class Beat( models.Model ):

    user = models.ForeignKey( settings.AUTH_USER_MODEL )
    name = models.CharField( max_length= 50 )
    date_created = models.DateTimeField( help_text= 'Date Created', default= lambda: timezone.localtime(timezone.now()) )
    description = models.CharField( max_length= 200 )

    def __unicode__(self):
        return self.name

    def get_url(self):
        return reverse( 'open_beat', args= [ self.id ] )