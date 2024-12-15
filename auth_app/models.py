# Create your models here.
from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
import uuid


class CustomBaseUserManager(BaseUserManager):

    """ for creating user that authenticates with email """

    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('Email cannot be blank')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get("is_superuser") != True:
            raise TypeError('superuser must be set to True')
        if extra_fields.get("is_staff") != True:
            raise TypeError('is_staff must be set to True')
        user = self.create_user(email=email, password=password, **extra_fields)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):

    """ custom user model """

    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    email = models.EmailField(null=False, unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=122)
    last_name = models.CharField(max_length=122)
    is_active = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=15)
    date_joined = models.DateTimeField(default=timezone.now)
    expertise = models.TextField()
    profile_pic = models.FileField(null=True)

    REQUIRED_FIELDS = []
    USERNAME_FIELD = "email"

    objects = CustomBaseUserManager()

    def __str__(self):
        return self.email

class Jobs(models.Model):
    """ models that contains details about the jobs posted """

    job_title = models.CharField(max_length=122, null=False)
    short_job_description = models.TextField()
    full_job_description = models.TextField(default='full job description goes here..')

    enumeration = models.CharField(max_length=100)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.job_title

class JobApplication(models.Model):

    """ models that collects and stores job applications """
    first_name = models.CharField(max_length=122, null=False)
    last_name = models.CharField(max_length=122)
    upload_cv = models.FileField(upload_to='documents/', blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    applicant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    jobs = models.ForeignKey(Jobs, on_delete=models.CASCADE, related_name="job")
    def __str__(self):
        return self.first_name
