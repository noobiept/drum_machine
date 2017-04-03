from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone
from django.urls import reverse


def dateCreated():
    return timezone.localtime( timezone.now() )


class Account( AbstractUser ):

    is_moderator = models.BooleanField( default= False )

    def get_url(self):
        return reverse( 'accounts:user_page', args= [ self.username ] )


class PrivateMessage( models.Model ):

    receiver = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete= models.CASCADE )
    sender = models.ForeignKey( settings.AUTH_USER_MODEL, related_name= 'sender', on_delete= models.CASCADE )
    title = models.TextField( max_length= 100 )
    content = models.TextField( max_length= 500 )
    date_created = models.DateTimeField( help_text= 'Date Created', default= dateCreated )

    def __unicode__(self):
        return self.title

    def get_url(self):
        return reverse( 'accounts:open_message', args= [ self.id ] )