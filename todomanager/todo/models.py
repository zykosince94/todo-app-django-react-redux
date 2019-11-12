from django.db import models
from django.contrib.auth.models import User

class BucketItem(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="buckets", on_delete=models.CASCADE, null=True)

class ToDoItem(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    bucket_Id = models.IntegerField(null=True)
    is_complete = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name="todos", on_delete=models.CASCADE, null=True)