from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, JobApplication, Jobs



class CustomAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    ordering = ['-email']
    fieldsets = [(None, {'fields': ('email', 'expertise', 'phone_number')})]
    add_fieldsets = [(None, {'fields': ('email', 'expertise', 'phone_number')})]
    model = CustomUser
    list_display = ['email', 'expertise', 'first_name', 'last_name']

    pass

# Register your models here.

admin.site.register(CustomUser, CustomAdmin)
admin.site.register(JobApplication)
admin.site.register(Jobs)




