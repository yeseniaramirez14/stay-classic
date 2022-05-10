from django.contrib import admin
from django.urls import path
from .views import (
    api_list_customer, 
    api_list_salesreps, 
    api_show_salesrep,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path("salesreps/", api_list_salesreps, name = "list_salesreps"),
    path("salesreps/<int:pk>/", api_show_salesrep, name = "show_salesreps"),
    path("customers/", api_list_customer, name = "list_customers"),
]
