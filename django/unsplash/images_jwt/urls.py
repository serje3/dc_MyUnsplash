from django.urls import path
from .views import ImageListCreateAPIView, ImageDestroyAPIView

urlpatterns = [
    path('api/image', ImageListCreateAPIView.as_view()),
    path('api/image/delete/<imageID>', ImageDestroyAPIView.as_view()),
]
