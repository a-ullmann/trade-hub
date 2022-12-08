from django.db import models


class Subcategory(models.Model):
    name = models.CharField(max_length=50)
    # category = models.ForeignKey(
    #     'categories.Category',
    #     related_name='categories',
    #     on_delete=models.CASCADE
    # )

    def __str__(self):
        return f'{self.name} - {self.category}'
