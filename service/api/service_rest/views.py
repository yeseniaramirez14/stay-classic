from django.shortcuts import render
from pkg_resources import require

# from inventory.api.common.json import DateEncoder
from .models import Technician, AutomobileVO, Service
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json


# Create your views here.
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number"
    ]


class ServiceListEncoder(ModelEncoder): 
    model = Service
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "is_vip",
        "is_finished"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "is_vip",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":

        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)

        return JsonResponse(
            technician, 
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServiceListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)

        try:
            technician_number = content["technician"]
            technician = Technician.objects.get(employee_number=technician_number)
            print(technician)
            content["technician"] = technician 
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status = 400,
            )
        

        vin_number = content["vin"]
        print("hello")
        print(AutomobileVO.objects.all())
        if AutomobileVO.objects.filter(vin=vin_number).exists():
            content["is_vip"] = True
            print("this is working")
        # if vin_number in AutomobileVO.objects.all():

        #     print("it is vip")
        else:
            content["is_vip"] = False
            print("it is not vip")
            
        # try:
        #     vin_number = content["vin"]
        #     print(vin_number)
        #     vin = AutomobileVO.objects.get(vin=vin_number)
        #     print(AutomobileVO.objects.all())
        #     content["vin"] = vin
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid automobile vin"},
        #         status = 400,
        #     )

        services = Service.objects.create(**content)
        print(services)
        return JsonResponse(
            services,
            encoder = ServiceDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "PUT"])
def api_detail_services(request, pk):
    if request.method == "DELETE":
        count, _ = Service.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        Service.objects.filter(id=pk).update(**content)
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False
        )
    