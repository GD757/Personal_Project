from django.db import models

class Room(models.Model): 
    name = models.CharField(max_length=150)
    capacity = models.IntegerField()
    features = models.TextField()
    is_available = models.BooleanField(default=True)
    address = models.CharField(max_length=150)
    # image_3d = models.FileField(upload_to='3d_models/', blank=True, null=True)  # Field to upload 3D models




    

    def __str__(self):
        return self.name
