# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drum_machine', '0002_auto_20150701_1022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beat',
            name='description',
            field=models.CharField(max_length=900),
        ),
        migrations.AlterField(
            model_name='beat',
            name='name',
            field=models.CharField(max_length=25),
        ),
    ]
