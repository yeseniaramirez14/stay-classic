from django.db import models

# Create your models here.
class Technician(models.model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField()

class Service(models.model):
    vin = models.CharField(max_length=50, unique=True)
    customer = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )