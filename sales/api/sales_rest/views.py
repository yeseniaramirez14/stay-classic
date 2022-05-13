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
        'vin',
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
        "name",
        "address",
        "phone_number",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]




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
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_rep": SalesRepListEncoder(),
        "customer": CustomerListEncoder(),
    }

class SalesRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "sales_rep",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_rep": SalesRepListEncoder(),
        "customer": CustomerListEncoder(),
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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesrep(request, pk):
    if request.method == "GET":
        salesrep = SalesRep.objects.get(id=pk)

        return JsonResponse(
            {"salesrep": salesrep},
            encoder = SalesRepDetailEncoder,
        )
    
    elif request.method == "DELETE":
        count, _ = SalesRep.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )

    else:
        content = json.loads(request.body)
        SalesRep.objects.filter(id=pk).update(**content)
        salesrep = SalesRep.objects.get(id=pk)
        return JsonResponse(
            salesrep,
            encoder=SalesRepDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)

        return JsonResponse(
            {"customer": customer},
            encoder = CustomerDetailEncoder,
        )
    
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )

    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_salesrecords(request):
    if request.method == "GET":
        salesrecord = SalesRecord.objects.all()
        return JsonResponse(
            {"salesrecord": salesrecord},
            encoder=SalesRecordListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)


        try:
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile"},
                status=400,
            )

        try:
            sales_rep_name = content["sales_rep"]
            sales_rep = SalesRep.objects.get(name=sales_rep_name)
            content["sales_rep"] = sales_rep
        except SalesRep.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales rep"},
                status=400,
            )

        try:
            customer_name = content["customer"]
            customer = Customer.objects.get(name=customer_name)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status=400,
            )
        
        salesrecord = SalesRecord.objects.create(**content)
        return JsonResponse(
            salesrecord,
            encoder=SalesRecordDetailEncoder,
            safe=False,
        )
