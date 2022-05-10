from django.contrib import admin
from django.urls import path
from .views import api_list_salesreps


urlpatterns = [
    path('admin/', admin.site.urls),
    path("salesreps/", api_list_salesreps, name = "list_salesreps"),
]
