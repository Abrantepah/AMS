# Generated by Django 4.2.6 on 2024-05-06 03:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_session_expiration_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='expiration_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 6, 4, 2, 20, 319099, tzinfo=datetime.timezone.utc)),
        ),
        migrations.DeleteModel(
            name='StudentTable',
        ),
    ]
