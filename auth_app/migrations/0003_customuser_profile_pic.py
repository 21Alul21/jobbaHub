# Generated by Django 5.1.1 on 2024-11-09 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0002_alter_jobapplication_jobs'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_pic',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]
