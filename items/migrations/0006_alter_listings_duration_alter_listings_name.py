# Generated by Django 4.1.4 on 2022-12-15 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0005_alter_listings_buyer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listings',
            name='duration',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='listings',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]