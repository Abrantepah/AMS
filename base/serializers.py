from rest_framework import serializers
from .models import Lecturer, Student, StudentPermission, StudentCourse, StudentSession, Session


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = '__all__'


class StudentPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPermission
        fields = '__all__'


class StudentSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSession
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        field = 'course'
