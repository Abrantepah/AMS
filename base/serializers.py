from rest_framework import serializers
from .models import Lecturer, Course, Student, StudentCourse, StudentSession, Session


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = '__all__'
