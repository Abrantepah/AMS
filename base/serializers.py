from rest_framework import serializers
from .models import Lecturer, Student, StudentPermission, StudentCourse, StudentSession, Course, Session, VerificationCode, Department


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


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class StudentSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSession
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = StudentCourse
        fields = '__all__'



class VerificationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationCode
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
