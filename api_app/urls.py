from django.urls import path
from .views import (
    CurrentUser, UpdateProfileView, ChangePasswordView, JobListingsView, JobApplicationView, DeletePostView, LogoutView, EditJobsPostView,
    PostJobView, UserJobPosts, UserApplications, JobDetails
)

urlpatterns = [
    path('job-listings/', JobListingsView.as_view(), name='job-listings'),
    path('job-applications/<int:job_id>/', JobApplicationView.as_view(), name='job-applications'),
    path('current-user/', CurrentUser.as_view(), name='current-user'),
    path('delete-post/<int:pk>/', DeletePostView.as_view(), name='delete-post'),
    path('update-profile/', UpdateProfileView.as_view(), name='update-profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('edit-jobs/<int:pk>/', EditJobsPostView.as_view(), name="edit-post"),
    path('post-job/', PostJobView.as_view(), name='post-job'),
    path('user-job-posts/', UserJobPosts.as_view(), name="user-jo-post"),
    path('user-applications/', UserApplications.as_view(), name='user-applications'),
    path('job-details/<int:job_id>/', JobDetails.as_view(), name='job-details'),

]