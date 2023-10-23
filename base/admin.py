from django.contrib import admin
from .models import Department, Student, Course, Lecturer, Glocation # Register your models here.


admin.site.register(Department)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Lecturer)
admin.site.register(Glocation)