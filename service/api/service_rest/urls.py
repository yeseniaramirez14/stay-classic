from django.urls import path

from .views import (
    api_list_technicians, api_list_services, api_delete_service
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("services/", api_list_services, name="api_list_services"),
    path("services/<int:pk>/", api_delete_service, name="api_delete_service"),
]
