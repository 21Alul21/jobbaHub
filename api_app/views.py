from django.shortcuts import render

from django.shortcuts import render
from rest_framework.views import APIView
from auth_app.serializers import UserSerializer, ChangePasswordSerializer, JobSerializer, JobApplicationSerializer
from rest_framework.response import Response
from rest_framework import status
from auth_app.models import Jobs, CustomUser
from rest_framework import permissions
from django.contrib.auth import update_session_auth_hash
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import RetrieveUpdateAPIView
from auth_app.serializers import JobSerializer
from auth_app.models import Jobs
from rest_framework.generics import CreateAPIView
from django.shortcuts import get_object_or_404
from auth_app.models import JobApplication


# Create your views here.
class JobListingsView(APIView):
    """ returns list of available jobs sorted in descending order
    based on date posted 
    """

    def get(self, request, *args, **kwargs):
        jobs = Jobs.objects.all().order_by('-id')
        if jobs:

            serializer = JobSerializer(jobs, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'jobs': 'No job postings at the moment, check back later'})
        
        
class JobApplicationView(APIView):
    """ Receives job application credentials from applicants
     and saves to the database, to be accessible by the job posters
    """

    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request, job_id, *args):
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():

            applicant = request.user
            job = get_object_or_404(Jobs, id=job_id)

            serializer.save(applicant=applicant, jobs=job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CurrentUser(APIView):
    """ returns currently authenticated users """

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request, *args, **kwargs):

        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeletePostView(APIView):
    """ deletes seleted post by the author """

    permission_classes = [permissions.IsAuthenticated]
    def delete(self, request, *args, **kwargs):
        try:

            pk = kwargs.get('pk')

            post = Jobs.objects.get(id=pk)
            if post.author != request.user:
                return Response({'error': 'You are not allowed to delete this post'}, status=status.HTTP_403_FORBIDDEN)

            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Jobs.DoesNotExist:
            return Response({'error': 'post not found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateProfileView(APIView):
    """ accepts user data for profile modifications """

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):

        user = request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            return Response({'success': 'user profile info successfully updated'}, status=status.HTTP_200_OK)
    
        
class ChangePasswordView(APIView):
    """ changes the password of authenticated users by providing
    current password
    """

    permission_classes = [permissions.IsAuthenticated]


    def put(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            user = request.user

            if not user.check_password(old_password):
                return Response({'error': 'new and old password do not match'}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(new_password)
            user.save()

            update_session_auth_hash(user)

            
            return Response({'success': 'password reset successfull'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class LogoutView(APIView):
    """ logs out currently logged in user """
    permission_classes = [permissions.IsAuthenticated]


    def post(self, request, *args, **kwargs):
        try:

            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'success': 'logout successful'}, status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EditJobsPostView(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = JobSerializer
    queryset = Jobs.objects.all()


class PostJobView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def post(self, request, *args, **kwargs):
        

        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():

            author = request.user
            job = serializer.save(author=author)
            response_serializer = JobSerializer(job)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

class UserJobPosts(APIView):
    """ endpoint that returns all the job posts
     made by a user
    """
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):

        user =  request.user
        user_posts = Jobs.objects.filter(author=user).order_by("-id")
        if user_posts:
            serializer = JobSerializer(user_posts, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(["no posts to display"], status=status.HTTP_404_NOT_FOUND)


class UserApplications(APIView):
    """ endpoint that returns a list of all the applications made by a particular user """

    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):

        user = request.user
        user_applications = JobApplication.objects.filter(applicant=user).order_by("-id")
        
        if user_applications:
            serializer = JobApplicationSerializer(user_applications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "no job applications available"}, status=status.HTTP_400_BAD_REQUEST)
    

class JobDetails(APIView):
    """ view that returns the details of a specific job posted """

    def get(self, request, job_id):

        post = get_object_or_404(Jobs, id=job_id)

        if post:
            serializer = JobSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

