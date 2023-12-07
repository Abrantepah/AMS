from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lecturer, Course, Student, StudentCourse, StudentSession, StudentPermission
from .serializers import StudentSerializer, LecturerSerializer, StudentPermissionSerializer, StudentSessionSerializer, CourseSerializer
from django.contrib.auth import authenticate, login
from django.db.models import F, Q


@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_lecturers(request):
    lecturers = Lecturer.objects.all()
    serializer = LecturerSerializer(lecturers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Create other API views as needed


class StudentLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None and Student.objects.filter(user=user).exists():
            # User credentials are valid, log in the user
            login(request, user)

            # Return student details as JSON response
            student = Student.objects.get(user=user)
            serializer = StudentSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # User credentials are invalid, return an error response
            return Response({'error': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LecturerLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None and Lecturer.objects.filter(user=user).exists():
            # User credentials are valid, log in the user
            login(request, user)

            # Return student details as JSON response
            lecturer = Lecturer.objects.get(user=user)
            serializer = LecturerSerializer(lecturer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # User credentials are invalid, return an error response
            return Response({'error': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def student_home(request, user_id):
    try:
        student = Student.objects.get(user_id=user_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=200)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=404)


@api_view(['GET', 'POST'])
def permission_api(request, user_id):
    student = Student.objects.get(id=user_id)
    student_courses = StudentCourse.objects.filter(student=student)
    default_course = student_courses.first()

    # Fetch sessions
    sessions = StudentSession.objects.filter(
        Q(studentcourse=default_course, attended=False) | Q(
            studentcourse=default_course, attended=None)
    ).exclude(studentpermission__sent=True)

    course_serializer = CourseSerializer(student_courses, many=True)

    if request.method == 'POST':
        studentsession_id = request.data.get('session')
        studentsession = StudentSession.objects.get(id=studentsession_id)
        message = request.data.get('message')

        student_permission, created = StudentPermission.objects.get_or_create(
            studentsession=studentsession,
            message=message,
            sent=True,
        )

        # Check if the object was created before saving
        if created:
            student_permission.save()

        serializer = StudentPermissionSerializer(student_permission)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    response_data = {
        'sessions': StudentSessionSerializer(sessions, many=True).data,
        'courses': course_serializer.data,
    }
    return Response(response_data)


# @api_view([''])
# def session(request):
