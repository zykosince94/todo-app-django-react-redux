from rest_framework import routers
from .api import TodoViewSet, BucketViewSet

router = routers.DefaultRouter()
router.register('api/todos', TodoViewSet, 'todos')
router.register('api/buckets', BucketViewSet, 'buckets')

urlpatterns = router.urls