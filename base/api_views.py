from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lecturer, Course, Student, StudentCourse, StudentSession, StudentPermission, VerificationCode, StudentCode, Session, Attendance
from .serializers import StudentSerializer, LecturerSerializer, StudentPermissionSerializer, StudentSessionSerializer, CourseSerializer, SessionSerializer
from django.contrib.auth import authenticate, login
from django.db.models import F, Q
from datetime import timedelta
from django.utils import timezone
import math


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
def permission_api(request, user_id, course_id=None):
    student = Student.objects.get(id=user_id)
    student_courses = StudentCourse.objects.filter(student=student)
    if course_id is not None:
        selected_studentcourse = StudentCourse.objects.get(
            student=student, course_id=course_id)

        # Fetch sessions
        sessions = StudentSession.objects.filter(
            Q(studentcourse=selected_studentcourse, attended=False) | Q(
                studentcourse=selected_studentcourse, attended=None)
        ).exclude(studentpermission__sent=True)

    else:
        sessions = None

    course_instances = [
        student_course.course for student_course in student_courses]
    course_serializer = CourseSerializer(course_instances, many=True)

    if request.method == 'POST':
        studentsession_id = request.data.get('sessionId')
        studentsession = StudentSession.objects.get(id=int(studentsession_id))
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
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def verification_api(request, user_id):

    current_time = timezone.now()
    error_message = None
    student = Student.objects.get(id=user_id)

    if request.method == 'POST':
        try:
            code = request.data.get('verificationcode')
            verification_code = VerificationCode.objects.get(
                code=code, used=False)
            session = verification_code.session
        except VerificationCode.DoesNotExist:
            return Response({'error': 'code does not exist'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if verification_code.expiration_time <= current_time or StudentCode.objects.filter(code=code, student=student).exists():
                verification_code.used = True
                verification_code.save()
                return Response({'error': 'Verification code has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                # Get the student's location
                student_latitude = float(request.data.get('latitude'))
                student_longitude = float(request.data.get('longitude'))
                verification_latitude = float(verification_code.latitude)
                verification_longitude = float(verification_code.longitude)

                # Calculate the distance between the two sets of coordinates using the Haversine formula
                radius = 6371  # Earth's radius in kilometers
                lat1 = math.radians(student_latitude)
                lon1 = math.radians(student_longitude)
                lat2 = math.radians(verification_latitude)
                lon2 = math.radians(verification_longitude)

                delta_lat = lat2 - lat1
                delta_lon = lon2 - lon1

                a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1) * \
                    math.cos(lat2) * math.sin(delta_lon / 2) ** 2
                c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
                distance = radius * c  # Distance in kilometers

                # Assuming you want to allow a maximum distance of, for example, 1 kilometer
                max_distance = 0.05  # Change to 1.0 for kilometers

                # Perform the radius check
                if verification_code.expiration_time <= current_time or distance > max_distance:
                    return Response({'error': 'you are not within the location radius'}, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    session.expiration_time = current_time + \
                        timedelta(minutes=5)
                    verification_code.used = False
                    session.save()
                    verification_code.save()

                    if student:
                        try:
                            student_course = StudentCourse.objects.get(
                                student=student, course=verification_code.course)
                        except StudentCourse.DoesNotExist:
                            return Response({f'error': 'you are not enrolled in '}, status=status.HTTP_401_UNAUTHORIZED)
                        else:
                            if student.year != verification_code.course.year:
                                return Response({"Enrollment year does not match the course."}, status=status.HTTP_401_UNAUTHORIZED)
                            else:
                                # load the message.success in a green-covered text
                                course_serializer = CourseSerializer(
                                    verification_code.course)
                                lecturer_serializer = LecturerSerializer(
                                    verification_code.lecturer)
                                session_serializer = SessionSerializer(
                                    verification_code.session)

                                response_data = {
                                    'courses': course_serializer.data,
                                    'lecturer': lecturer_serializer.data,
                                    'session': session_serializer.data,
                                }

                                return Response(response_data, status=status.HTTP_202_ACCEPTED)
    return Response({error_message}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def MarkAttendance(request, user_id, code):
    verification_code = VerificationCode.objects.get(code=code)
    lecturer = verification_code.lecturer
    course = verification_code.course
    session = verification_code.session
    student = Student.objects.get(id=user_id)
    student_course = StudentCourse.objects.get(
        student=student, course=course)  # Use get() here
    session_id = session.id
    displaysession = Session.objects.annotate(
        student_session_modulo=(((F('id') - 1) % 15) + 1)
    ).get(id=session_id)


# Use F expressions to get the modulo 10 of the StudentSession ID
    student_sessions = StudentSession.objects.annotate(
        student_session_modulo=(((F('id') - 1) % 15) + 1)
    ).filter(studentcourse=student_course)

    # Filter for StudentSessions where the modulo 10 of the ID matches the Session ID
    matching_sessions = student_sessions.filter(
        student_session_modulo=(((session_id-1) % 15) + 1))

    for matching_session in matching_sessions:
        match = matching_session

    time = session.expiration_time
    time_remaining = (time - timezone.now()).total_seconds()
    if time_remaining <= 0:
        return Response({'error': 'Session has expired'}, status=status.HTTP_408_REQUEST_TIMEOUT)

    if request.method == 'POST':
        # Check if the student is eligible to mark attendanc
        if time_remaining > 0:

            attendance_type = request.data.get('attendance_type')
            if attendance_type == 'start':

                studentcode, created = StudentCode.objects.get_or_create(
                    student=student,
                    code=verification_code,
                    defaults={'used': False}
                )
                if created:
                    studentcode.used = True
                    studentcode.save()

                # Mark attendance for the start of the session
                attendance, created = Attendance.objects.get_or_create(
                    StudentCourse=student_course,
                    session=session,
                    defaults={'attended_start': True}
                )
                if not created:
                    attendance.attended_start = True
                    attendance.save()
            elif attendance_type == 'end':

                # Mark attendance for the end of the session
                attendance, created = Attendance.objects.get_or_create(
                    StudentCourse=student_course,
                    session=session,
                    defaults={'attended_end': True}
                )
                if not created:
                    attendance.attended_end = True
                    attendance.save()

                end = Attendance.objects.get(
                    session=session, StudentCourse=student_course)
                if end.attended_start is True:
                    match.attended = True
                    match.save()

        return Response({'atttendance Marked Successfully'}, status=status.HTTP_201_CREATED)

    attendance_marked_start = Attendance.objects.filter(
        session=session, attended_start=True).exists()

    response_data = {
        'time_remaining': time_remaining,
        'attendance_marked_start': attendance_marked_start,
    }

    return Response(response_data, status=status.HTTP_200_OK)
