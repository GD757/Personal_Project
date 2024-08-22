from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from django.http import JsonResponse
import os

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


class ListModelsView(APIView):
    def get(self, request):
        # Mock data; replace with API calls to Matterport if needed
        models = [
            {"id": "model_1", "name": "Event Space 1", "description": "A spacious event area."},
            {"id": "model_2", "name": "Conference Room", "description": "A professional meeting space."},
        ]
        return Response(models)



class WeatherView(APIView):

    def get(self, request):
        api_key = os.getenv('WEATHER_API_KEY')
        location = request.GET.get('location', 'Virginia')  # Default location if not provided
        url = f'http://api.openweathermap.org/data/2.5/weather?q={location}&units=imperial&appid={api_key}'
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Failed to fetch weather data'}, status=status.HTTP_400_BAD_REQUEST)



