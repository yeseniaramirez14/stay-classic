from django.shortcuts import render
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

        try:
            automobile_href = content["automobile"]
            automobile = AutomobileVO.objects.get(import_href=automobile_href)
            content["automobile"] = automobile
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