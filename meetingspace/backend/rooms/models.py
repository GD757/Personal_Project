from django.db import models

class Room(models.Model): 
    name = models.CharField(max_length=150)
    capacity = models.IntegerField()
    features = models.TextField()
    is_available = models.BooleanField(default=True)
    address = models.CharField(max_length=150)
    gltf_model = models.FileField(upload_to='3d_models/', blank=True, null=True) 




    

    def __str__(self):
        return self.name
