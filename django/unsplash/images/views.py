from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Image
from .serializers import ImagePOSTSerializer, ImageGETSerializer, ImageDELETESerializer
from .permissions import IsOwnerImage


# Create your views here.
class ImageListCreateAPIView(ListCreateAPIView):
    queryset = Image.objects.order_by('-date_uploaded')
    serializer_class = {
        'POST': ImagePOSTSerializer,
        'GET': ImageGETSerializer,
    }
    # universal for both methods
    default_serializer_class = ImagePOSTSerializer
    permission_classes = [IsOwnerImage, IsAuthenticated]

    def filter_queryset(self, queryset):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        owner = self.request.user
        serializer.save(owner=owner)

    def get_serializer_class(self):
        return self.serializer_class.get(self.request.method, ImagePOSTSerializer)


class ImageDestroyAPIView(DestroyAPIView):
    queryset = Image.objects.order_by('-date_uploaded')
    serializer_class = ImageDELETESerializer
    permission_classes = [IsOwnerImage, IsAuthenticated]
    lookup_url_kwarg = "imageID"

    def filter_queryset(self, queryset):
        return self.queryset.filter(owner=self.request.user)

    def destroy(self, request, *args, **kwargs):
        if authenticate(username=request.data['username'], password=request.data['password']):
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
