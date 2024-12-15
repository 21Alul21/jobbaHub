from django.shortcuts import render

# Create your views here.
""" Job Listings Webapp API """

from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, ChangePasswordSerializer, JobSerializer, JobApplicationSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Jobs, CustomUser
from rest_framework import permissions
from django.contrib.auth import update_session_auth_hash
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

class RegisterView(APIView):
    """ receives the user registration credentials for and registers the user
     if the credentials are validated
    """

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = True
            user.set_password(user.password)
            user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

