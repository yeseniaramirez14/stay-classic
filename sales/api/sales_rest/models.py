from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=50)

    def __str__(self):
        return self.vin


class SalesRep(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField()


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.PositiveSmallIntegerField()


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="auto_record",
        on_delete=models.PROTECT,
    )
    sales_rep = models.ForeignKey(
        SalesRep,
        related_name="sales_rep_record",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer_record",
        on_delete=models.PROTECT,
    )
    price = models.PositiveSmallIntegerField()