from typing import Any, Dict
from rest_framework import serializers
from .models import CustomUser, Jobs, JobApplication
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        exclude = ['phone_number']

class JobSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Jobs
        exclude = ['author']

    # def create(self, validated_data):
    #     validated_data['author'] = self.context.get('request').user
    #     return super().create(validated_data)

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        exclude = ['applicant', 'jobs']

class ChangePasswordSerializer(serializers.Serializer):
    
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:

        email = attrs.get('email')
        password = attrs.get('password')
        if email and password:
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("user does not exist")
            
            user = authenticate(user)


        return super().validate(attrs)