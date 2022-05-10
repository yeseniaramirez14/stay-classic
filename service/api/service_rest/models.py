from django.db import models

# Create your models here.
class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return f"{self.vin}"


class Service(models.Model):
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=50)
    date_time = models.DateTimeField(null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    reason = models.CharField(max_length=100)
    is_vip = models.BooleanField(default=False)
    status = models.

    def __str__(self):
        return f"{self.reason} for {self.customer}"


