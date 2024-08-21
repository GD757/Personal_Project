from django.db import models
from accounts.models import User
from rooms.models import Room

class Event(models.Model):
    name = models.CharField(max_length=100)
    rooms = models.ManyToManyField(Room, related_name='events', blank=True)
    date = models.DateTimeField()
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    

    

    def __str__(self):
        return self.name
    

