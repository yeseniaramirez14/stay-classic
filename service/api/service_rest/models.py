from django.db import models

# Create your models here.
class Technician(models.model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField()


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)


class Service(models.model):
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="vin",
        on_delete=models.PROTECT,
    )
    customer = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    reason = models.CharField(max_length=100)


