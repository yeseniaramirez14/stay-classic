from django.urls import path

from .views import (
    api_list_technicians, api_list_services, api_detail_services
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("services/", api_list_services, name="api_list_services"),
    path("services/<int:pk>/", api_detail_services, name="api_detail_services"),
]
