from django.shortcuts import render
from pkg_resources import require
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


class ServiceListEncoder(ModelEncoder): 
    model = Service
    properties = [
        "vin",
        "customer",
        "date",
        "time",
        "technician",
        "reason"
    ]

    def get_extra_data(self, o):
        return {"vin": o.automobile.vin}


class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer",
        "date",
        "time",
        "technician",
        "reason"
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
    }


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number"
    ]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number"
    ]


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":

        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)

        return JsonResponse(
            technician, 
            encoder=TechnicianDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_services(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is not None:
            services = Service.objects.filter(automobile=automobile_vo_id)
        else:
            services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServiceListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)

        try:
            vin_number = content["vin"]
            print(vin_number)
            vin = AutomobileVO.objects.get(vin=vin_number)
            print(AutomobileVO.objects.all())
            content["vin"] = vin

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status = 400,
            )
        services = Service.objects.create(**content)
        return JsonResponse(
            services,
            encoder = ServiceDetailEncoder,
            safe=False,
        )