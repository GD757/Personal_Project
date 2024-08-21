from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from .models import Event
from .serializers import EventSerializer

class EventList(APIView):

    def get(self, request):
        events = Event.objects.all()
        serialized = EventSerializer(events, many=True)
        return Response(serialized.data)

    def post(self, request):
        data = request.data
        data['user'] = request.user.id  # Automatically associate the event with the logged-in user
        serialized = EventSerializer(data=data)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=HTTP_201_CREATED)
        return Response(serialized.errors, status=HTTP_400_BAD_REQUEST)

    # def post(self, request, *args, **kwargs):
    #     data = request.data
    #     data['user'] = request.user.id  # Automatically associate the event with the logged-in user
    #     serializer = EventSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=HTTP_201_CREATED)
    #     return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class EventDetail(APIView):

    def get_object(self, id):
        try:
            return Event.objects.get(id=id)
        except Event.DoesNotExist:
            return None

    def get(self, request, id):
        event = self.get_object(id)
        if event is None:
            return Response({"error": "Event not found"}, status=HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, id):
        event = self.get_object(id)
        if event is None:
            return Response({"error": "Event not found"}, status=HTTP_404_NOT_FOUND)
        serialized = EventSerializer(event, data=request.data)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        event = self.get_object(id)
        if event is None:
            return Response({"error": "Event not found"}, status=HTTP_404_NOT_FOUND)
        event.delete()
        return Response(status=HTTP_204_NO_CONTENT)

