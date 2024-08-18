from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ModelDetailsView(APIView):
    def get(self, request, model_id):
        # Mock data; integrate database models
        data = {
            "model_id": model_id,
            "name": "Example Model",
            "description": "This is a sample description of the model.",
            "created_on": "2024-09-15",
        }
        return Response(data, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.response import Response

class ListModelsView(APIView):
    def get(self, request):
        # Mock data; replace with API calls to Matterport if needed
        models = [
            {"id": "model_1", "name": "Event Space 1", "description": "A spacious event area."},
            {"id": "model_2", "name": "Conference Room", "description": "A professional meeting space."},
        ]
        return Response(models)


