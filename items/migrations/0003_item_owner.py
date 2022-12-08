# Generated by Django 4.1.4 on 2022-12-08 11:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('items', '0002_item_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='items', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
