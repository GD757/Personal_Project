from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from .models import Room
from .serializers import RoomSerializer
from django.shortcuts import render, redirect
from .models import Room


class RoomList(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True) 
        return Response(serializer.data)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class RoomDetail(APIView):
    def get_object(self, pk):
        try:
            return Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return None

    def get(self, request, pk):
        room = self.get_object(pk)
        if room is None:
            return Response({"error": "Room not found"}, status=HTTP_404_NOT_FOUND)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    def put(self, request, pk):
        room = self.get_object(pk)
        if room is None:
            return Response({"error": "Room not found"}, status=HTTP_404_NOT_FOUND)
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        room = self.get_object(pk)
        if room is None:
            return Response({"error": "Room not found"}, status=HTTP_404_NOT_FOUND)
        room.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def patch(self, request, pk):
        room = self.get_object(pk)
        if room is None:
            return Response({"error": "Room not found"}, status=HTTP_404_NOT_FOUND)
        
        
        if 'is_available' in request.data:
            room.is_available = request.data['is_available']
            room.save()
            return Response({"message": "Room booking status updated."}, status=HTTP_200_OK)
        
        return Response({"error": "Invalid request."}, status=HTTP_400_BAD_REQUEST)
    
# def create_room(request):
#     if request.method == 'POST':
#         form = RoomForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('room_list')  
#     else:
#         form = RoomForm()
#     return render(request, 'rooms/create_room.html', {'form': form})


