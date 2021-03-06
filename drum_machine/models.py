from django.db import models
from django.conf import settings
from django.urls import reverse
from django.utils import timezone


def dateCreated():
    return timezone.localtime( timezone.now() )


class Beat( models.Model ):

    user = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete= models.CASCADE )
    name = models.CharField( max_length= 25 )
    date_created = models.DateTimeField( help_text= 'Date Created', default= dateCreated )
    description = models.CharField( max_length= 900 )

    def __unicode__(self):
        return self.name

    def get_url(self):
        return reverse( 'open_beat', args= [ self.id ] )

    def get_score(self):
        allVotes = self.vote_set.all()
        length = len( allVotes )

            # means there is no score yet
        if length == 0:
            return -1

            # do the average
        else:
            count = 0

            for vote in allVotes:
                count += vote.score

            return count / length


class Vote( models.Model ):

    user = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete= models.CASCADE )
    beat = models.ForeignKey( Beat, on_delete= models.CASCADE )
    score = models.IntegerField()