from django.db import models
from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils import timezone

def dateCreated():
    return timezone.localtime( timezone.now() )


class Beat( models.Model ):

    user = models.ForeignKey( settings.AUTH_USER_MODEL )
    name = models.CharField( max_length= 50 )
    date_created = models.DateTimeField( help_text= 'Date Created', default= dateCreated )
    description = models.CharField( max_length= 400 )

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

    user = models.ForeignKey( settings.AUTH_USER_MODEL )
    beat = models.ForeignKey( Beat )
    score = models.IntegerField()