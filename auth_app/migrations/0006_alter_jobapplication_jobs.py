# Generated by Django 5.1.1 on 2024-11-16 12:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0005_alter_jobapplication_cover_letter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplication',
            name='jobs',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job', to='auth_app.jobs'),
        ),
    ]