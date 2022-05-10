from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render
from common.json import ModelEncoder
from .models import AutomobileVO, SalesRep, SalesRecord, Customer

# Create your views here.
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "color", 
        "year", 
        'vin',
        "model",
    ]



class SalesRepListEncoder(ModelEncoder):
    model = SalesRep
    properties = [
        "name",
        "employee_number",
    ]


class SalesRepDetailEncoder(ModelEncoder):
    model = SalesRep
    properties = [
        "name",
        "employee_number",
    ]



class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "automobile",
        "customer",
        "price",
    ]



class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]
    encoders = {
        "sale_rep":SalesRepDetailEncoder()
    }



class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "sales_rep",
        "customer",
        "price",
    ]
    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin, "sales_rep": o.sales_rep.name, "customer": o.customer.name} 

class SalesRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "sales_rep",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_salesreps(request):
    if request.method == "GET":
        salesrep = SalesRep.objects.all()
        return JsonResponse(
            {"salesrep": salesrep},
            encoder=SalesRepListEncoder,
        )
    else:
        content = json.loads(request.body)
        salesrep = SalesRep.objects.create(**content)
        return JsonResponse(
            salesrep,
            encoder=SalesRepDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customer": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customers = Customer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=CustomerDetailEncoder,
            safe=False
        )