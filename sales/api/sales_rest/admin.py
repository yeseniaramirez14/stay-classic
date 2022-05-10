from django.contrib import admin
from .models import  AutomobileVO, SalesRep, Customer, SalesRecord

# Register your models here.
@admin.register(SalesRep)
class SalesRepAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass