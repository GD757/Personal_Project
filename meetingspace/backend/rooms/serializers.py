from rest_framework import serializers
from .models import Room
from events.models import Event

class RoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = '__all__'