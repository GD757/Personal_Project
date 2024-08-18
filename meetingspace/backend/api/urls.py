# api/urls.py
from django.urls import path
from .views import ModelDetailsView

urlpatterns = [
    path('models/<str:model_id>/', ModelDetailsView.as_view(), name='model-details'),
    # path('api/', include('api.urls')) Use for api call on backend
]
