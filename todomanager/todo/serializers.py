from rest_framework import serializers
from .models import ToDoItem, BucketItem

class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = '__all__'

class BucketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketItem
        fields = '__all__'