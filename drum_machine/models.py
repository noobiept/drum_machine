from django.db import models
from django.conf import settings

class Beat( models.Model ):

    user = models.ForeignKey( settings.AUTH_USER_MODEL )
    name = models.CharField( max_length= 50 )
    description = models.CharField( max_length= 200 )

    def __unicode__(self):
        return self.name