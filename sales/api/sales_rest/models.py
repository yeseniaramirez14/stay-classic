from django.db import models

class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=50)


class SalesRep(models.Model):
    name = color = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField()


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.PositiveSmallIntegerField()
    sales_rep = models.ForeignKey(
        SalesRep,
        related_name="sales_rep",
        on_delete=models.PROTECT,
    )


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.PROTECT,
    )
    sales_rep = models.ForeignKey(
        SalesRep,
        related_name="sales_rep",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT,
    )
    price = models.PositiveSmallIntegerField()