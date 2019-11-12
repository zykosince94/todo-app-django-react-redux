from .models import ToDoItem, BucketItem
from rest_framework import viewsets, permissions
from .serializers import TodoItemSerializer, BucketItemSerializer

class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TodoItemSerializer

    def get_queryset(self):
        queryset = self.request.user.todos.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BucketViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = BucketItemSerializer

    def get_queryset(self):
        queryset = self.request.user.buckets.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)