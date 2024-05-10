from .serializers import StudentSerializer
from .models import Student
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lecturer, Course, Student, StudentCourse, StudentSession, StudentPermission, VerificationCode, StudentCode, Session, Attendance, Department
from .serializers import StudentSerializer, LecturerSerializer, StudentPermissionSerializer, StudentSessionSerializer, CourseSerializer, SessionSerializer, StudentCourseSerializer, DepartmentSerializer
from django.contrib.auth import authenticate, login, logout
from django.db.models import F, Q
from datetime import timedelta
from django.utils import timezone
import math
import string
import secrets
from django.shortcuts import get_object_or_404
import csv
from django.core.management.base import BaseCommand
import random


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


class StudentLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        reference = request.data.get('username')
        password = request.data.get('password')
        # uuid_code = request.data.get('uuidcode')
        error_message = None
        user = authenticate(request, username=username, password=password)

        if user and Student.objects.filter(user=user, reference=reference).exists():
            student = Student.objects.get(user=user)
            
            #this is for flutter device specifics
            # if uuid_code != '':
            #     if student.UUID == uuid_code:
            #         serializer = StudentSerializer(student).data
            #         return Response(serializer, status=status.HTTP_200_OK)
            #     else:
            #         error_message = 'wrong device, please use your own device for the attendance'
            #         return Response(error_message, status=status.HTTP_401_UNAUTHORIZED)
            # else:
            #     if student.UUID_sent:
            #         error_message = 'wrong device, please use your own device for the attendance'
            #         return Response(error_message, status=status.HTTP_401_UNAUTHORIZED)
            #     else:
            #         student.UUID_sent = True
            #         student.save()
            #         serializer = StudentSerializer(student).data
            #         return Response(serializer, status=status.HTTP_200_OK)

            serializer = StudentSerializer(student).data
            return Response(serializer, status=status.HTTP_200_OK)
        else:
            error_message = 'no student with these credentials'
            return Response(error_message, status=status.HTTP_401_UNAUTHORIZED)


class LecturerLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        reference = request.data.get('username')

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None and Lecturer.objects.filter(user=user, reference=reference).exists():
            # User credentials are valid, log in the user
            login(request, user)

            # Return student details as JSON response
            lecturer = Lecturer.objects.get(user=user)
            serializer = LecturerSerializer(lecturer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # User credentials are invalid, return an error response
            error_message = 'Invalid login credentials'
            return Response(error_message, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logoutUser(request):

    logout(request)
    return redirect('login')


@api_view(['GET'])
def student_home(request, user_id):
    try:
        student = Student.objects.get(id=user_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=200)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=404)


@api_view(['GET', 'POST'])
def permission_api(request, user_id):
    student = Student.objects.get(id=user_id)
    current_time = timezone.now()

    if student:
        if request.method == 'POST':
            code = request.data.get('verificationcode')
            message = request.data.get('message')
            verification_code = VerificationCode.objects.get(
                code=code, used=False)
            session = verification_code.session

            course = verification_code.course

            studentcourse = StudentCourse.objects.get(
                course=course, student=student)

            studentsessions = StudentSession.objects.filter(
                Q(studentcourse=studentcourse, attended=False) | Q(
                    studentcourse=studentcourse, attended=None)
            ).exclude(studentpermission__sent=True)

            if studentsessions.exists():
                studentsession = studentsessions.first()
            else:
                studentsession = None

            if verification_code.expiration_time <= current_time or StudentCode.objects.filter(code=code, student=student).exists():
                verification_code.used = True
                verification_code.save()
                return Response({'error': 'Verification code has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                session.expiration_time = current_time + \
                    timedelta(minutes=5)
                verification_code.used = False
                session.save()
                verification_code.save()

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

                        student_permission, created = StudentPermission.objects.get_or_create(
                            studentsession=studentsession,
                            message=message,
                            studentname=student.name,
                            index=student.index,
                            sent=True,
                        )

                       # Check if the object was created before saving
                        if created:
                            student_permission.save()
                            verification_code.used = True
                            verification_code.save()

                        permissionserializer = StudentPermissionSerializer(
                            student_permission)

                        response_data = {
                            'studentpermission': permissionserializer.data,
                            'courses': course_serializer.data,
                            'lecturer': lecturer_serializer.data,
                            'session': session_serializer.data,
                        }

                        return Response(response_data, status=status.HTTP_202_ACCEPTED)

        response_data = {}
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def verification_api(request, user_id):

    current_time = timezone.now()
    student = Student.objects.get(id=user_id)
    errorMessage = None

    if request.method == 'POST':
        try:
            code = request.data.get('verificationcode')
            verification_code = VerificationCode.objects.get(
                code=code, used=False)
            session = verification_code.session
        except VerificationCode.DoesNotExist:
            errorMessage = 'code does not exist'
            return Response(errorMessage, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if verification_code.expiration_time <= current_time or StudentCode.objects.filter(code=code, student=student).exists():
                verification_code.used = True
                verification_code.save()
                errorMessage = 'Verification code has expired'
                return Response(errorMessage, status=status.HTTP_401_UNAUTHORIZED)
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
                max_distance = 0.10  # Change to 1.0 for kilometers

                # Perform the radius check
                if verification_code.expiration_time <= current_time or distance > max_distance:
                    errorMessage = 'you are not within the location radius'
                    return Response(errorMessage, status=status.HTTP_401_UNAUTHORIZED)
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
                            errorMessage = 'you are not enrolled in'
                            return Response(errorMessage, status=status.HTTP_401_UNAUTHORIZED)
                        else:
                            if student.year != verification_code.course.year:
                                errorMessage = "Enrollment year does not match the course."
                                return Response(errorMessage, status=status.HTTP_401_UNAUTHORIZED)
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
    student = StudentSerializer(student).data
    return Response(student, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def MarkAttendance(request, user_id, code):
    verification_code = VerificationCode.objects.get(code=code)
    course = verification_code.course
    session = verification_code.session
    student = Student.objects.get(id=user_id)
    student_course = StudentCourse.objects.get(
        student=student, course=course)  # Use get() here
    session_id = session.id
    displaysession = Session.objects.annotate(
        student_session_modulo=(((F('id') - 1) % 15) + 1)
    ).get(id=session_id)


# Use F expressions to get the modulo 15 of the StudentSession ID
    student_sessions = StudentSession.objects.annotate(
        student_session_modulo=(((F('id') - 1) % 15) + 1)
    ).filter(studentcourse=student_course)

    # Filter for StudentSessions where the modulo 15 of the ID matches the Session ID
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


def generate_verification_code(lecturer, course, session, expiration_minutes, latitude, longitude):
    # Your code to generate the verification code
    alphabet = string.ascii_letters + string.digits
    verification_code = ''.join(secrets.choice(alphabet) for i in range(6))

    again = VerificationCode.objects.filter(code=verification_code).exists()
    while again:
        verification_code = ''.join(secrets.choice(alphabet) for i in range(6))
        again = VerificationCode.objects.filter(
            code=verification_code).exists()

    # Calculate expiration timestamp
    current_time = timezone.now()
    expiration_time = current_time + timedelta(minutes=expiration_minutes)

    # Store the verification code with the associated lecturer, course, and session
    code = VerificationCode.objects.create(
        code=verification_code,
        lecturer=lecturer,
        course=course,
        session=session,
        expiration_time=expiration_time,
        latitude=latitude,
        longitude=longitude,
    )
    return code


@api_view(['GET', 'POST'])
def generateCode_api(request, user_id, course_id=None):

    lecturer = Lecturer.objects.get(id=user_id)
    lecturer_serializer = LecturerSerializer(lecturer)
    first_session = None

    if lecturer:
        lecturer_courses = Course.objects.filter(lecturer=lecturer)

        if course_id is not None:
            # Filter the sessions for the default course and lecturer
            course = Course.objects.get(id=course_id)
            sessions = Session.objects.filter(
                course=course)
            available_sessions = [
                session for session in sessions if not session.is_attended()]
            first_session = available_sessions[0]

            # marked_sessions = [
            #     session for session in sessions if session.is_attended()]
            #     last_marked_session = marked_sessions[]

            if request.method == 'POST':
                selected_course = get_object_or_404(
                    Course, id=course_id)

                selected_session = first_session

                selected_latitude = request.data.get('latitude')
                selected_longitude = request.data.get('longitude')

            # minutes it takes for code to expire
                expiration_minutes = 15
            # Generate a verification code
                code = generate_verification_code(
                    lecturer, selected_course, selected_session, expiration_minutes, selected_latitude, selected_longitude)

            # Pass the filtered sessions to the context
                response_data = {'code': code.code}
                return Response(response_data, status=status.HTTP_201_CREATED)

        course_instances = [
            lecturer_course for lecturer_course in lecturer_courses]
        course_serializer = CourseSerializer(course_instances, many=True)

        session_serializer = SessionSerializer(
            first_session).data
        response_data = {'lecturer': lecturer_serializer.data, 'courses': course_serializer.data,
                         'session': session_serializer, }

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def PermissionTable_api(request, user_id):
    lecturer = Lecturer.objects.get(id=user_id)
    lecturer_courses = Course.objects.filter(lecturer=lecturer)

    studentcourses = StudentCourse.objects.filter(course__in=lecturer_courses)

    if request.method == 'POST':

        # Use request.POST to retrieve form data from a POST request
        indexF = request.data.get('indexFilter')
        courseF = request.data.get('courseFilter')
        programmeF = request.data.get('programmeFilter')
        yearF = request.data.get('yearFilter')
        strikeF = request.data.get('strikesFilter')
        nameF = request.data.get('nameFilter')

    # Apply filters based on user input
        if indexF:
            studentcourses = StudentCourse.objects.filter(
                student__index__icontains=indexF, course__lecturer=lecturer)
        if courseF:
            studentcourses = StudentCourse.objects.filter(
                course__name=courseF, course__lecturer=lecturer)
        if programmeF:
            studentcourses = StudentCourse.objects.filter(
                course__department=programmeF, course__lecturer=lecturer)
        if yearF:
            studentcourses = StudentCourse.objects.filter(
                student__year=yearF, course__lecturer=lecturer)
        if strikeF:
            if strikeF == '4':
                studentcourses = studentcourses.filter(
                    strike__range=[4, 15], course__lecturer=lecturer)
            else:
                studentcourses = studentcourses.filter(
                    strike=int(strikeF), course__lecturer=lecturer)
        if nameF:
            studentcourses = StudentCourse.objects.filter(
                student__name__icontains=nameF, course__lecturer=lecturer)

    sps = StudentPermission.objects.filter(
        studentsession__studentcourse__in=studentcourses,
        status=None
    )

    scsSerializer = StudentCourseSerializer(studentcourses, many=True).data

    spsSerializer = StudentPermissionSerializer(sps, many=True).data
    departments_with_lecturer = Department.objects.filter(
        lecturer=lecturer)

    lecturerCourses = CourseSerializer(lecturer_courses, many=True).data

    # change permission status and update strike

    response_data = {'studentcourses': scsSerializer,
                     'studentpermissions': spsSerializer,
                     }
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def update_permission_api(request, permission_id, messagestatus):

    if request.method == 'POST':

        permission = get_object_or_404(StudentPermission, id=permission_id)

        studentsession_id = permission.studentsession.id

        studentsession = StudentSession.objects.get(id=studentsession_id)
        # Update fields based on user's acceptance
        if messagestatus.lower() == 'true':
            studentsession.attended = True
        permission.status = True
        permission.save()
        studentsession.save()

        return Response({'permission Updated'}, status=status.HTTP_200_OK)
    return Response({'message': 'Invalid method'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def import_students(request):
    if request.method == 'POST':
        import_file = request.data.get('file')
        department_id = request.data.get('department_id')

        if not import_file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with open(import_file, 'r') as csv_file:
                csv_reader = csv.reader(csv_file)
                header = next(csv_reader, None)

                for row in csv_reader:
                    reference, name = row
                    name_parts = name.split(', ')
                    formatted_name = ' '.join(name_parts[::-1])

                    while True:
                        index = str(random.randint(100000, 999999))
                        if not Student.objects.filter(index=index).exists():
                            break

                    department, created = Department.objects.get_or_create(dno=department_id)

                    # Create a Student object
                    student = Student.objects.create(
                        reference=reference,
                        name=formatted_name,
                        year=1,
                        programme=department,
                        index=index
                    )

                return Response({'message': 'Students imported successfully'}, status=status.HTTP_200_OK)

        except FileNotFoundError:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        except PermissionError:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        except csv.Error as e:
            return Response({'error': f'CSV parsing error: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Valid request'}, status=status.HTTP_202_ACCEPTED)



@api_view(['GET'])
def studentsTable(request, user_id):
    # Get the lecturer associated with the current user
    lecturer = Lecturer.objects.get(id=user_id)

    # Get all courses related to the lecturer
    courses = Course.objects.filter(lecturer=lecturer)

    department_ids = courses.values_list('department', flat=True).distinct()

    # Filter departments based on the unique IDs
    departments = Department.objects.filter(id__in=department_ids)

    default_department = departments.first().id

    department = Department.objects.get(id=default_department)
    
    default_course_id = courses.first().id
    default_course = Course.objects.get(id=default_course_id)
    


    sessions = Session.objects.filter(course=default_course).annotate(
        student_session_modulo=((F('id') - 1) % 15) + 1
    )

    # Get all students enrolled in the courses related to the lecturer
    students = Student.objects.filter(
        studentcourse__course__department__in=departments, studentcourse__course__lecturer=lecturer)

    departments_with_lecturer = Department.objects.filter(
        lecturer=lecturer)

    # if request.method == 'GET':
    #     # Use request.POST to retrieve form data from a POST request
    #     indexF = request.data.get('indexFilter')
    #     courseF = request.data.get('courseFilter')
    #     yearF = request.data.get('yearFilter')
    #     # strikeF = request.data.get('strikesFilter')
    #     # nameF = request.data.get('nameFilter')

    #     # Apply filters based on user input
    #     if indexF:
    #         students = Student.objects.filter(
    #             index__icontains=indexF,  studentcourse__course__lecturer=lecturer)
    #         display = 'Index Number: ' + indexF
    #     if courseF:
    #         students = Student.objects.filter(
    #             studentcourse__course__name=courseF, studentcourse__course__lecturer=lecturer)
    #         default_course = Course.objects.get(name=courseF)
    #         display = 'Course: ' + default_course.name + \
    #             ' (Year:' + str(default_course.year) + ')'
    #     if yearF:
    #         students = Student.objects.filter(
    #             year=yearF, studentcourse__course__lecturer=lecturer)
    #         display = 'Year: ' + yearF
    #     # if strikeF:
    #     #     if strikeF == '4':
    #     #         students = Student.objects.filter(studentcourse__strike__range=[
    #     #             4, 15], studentcourse__course__lecturer=lecturer)
    #     #     else:
    #     #         students = Student.objects.filter(studentcourse__strike=int(
    #     #             strikeF), studentcourse__course__lecturer=lecturer)
    #     #     display = 'Number of Absences: ' + strikeF
    #     # if nameF:
    #     #     students = Student.objects.filter(
    #     #         name__icontains=nameF, studentcourse__course__lecturer=lecturer)
    #     #     display = 'Name: ' + nameF
    # else:
    #     students = Student.objects.filter(
    #     studentcourse__course__department__in=departments)
    #     # display = 'class: ' + department.dname 

    Tsessions = Session.objects.filter(
        attendance__attended=True, course=default_course)

    func_values = [(session.id - 1) % 15 + 1 for session in Tsessions]



    for student in students:
        try:
            studentcourse = StudentCourse.objects.get(
                student=student, course__lecturer=lecturer, course__year=student.year)
        except:
            message = 'nothing'

        studses = StudentSession.objects.filter(studentcourse=studentcourse)

        # for marking none attended sessions
        for func in func_values:
            for studse in studses:
                var = ((studse.id - 1) % 15) + 1
                if var == func:
                    mark = studse.attended
                    if mark is None:
                        mark = False
                    if mark is False:
                        mark = False
                    else:
                        mark = True
                    studse.attended = mark  # Set the value explicitly
                    studse.save()

        # Initialize the check variable inside the loop for each student
        check = 0

        for studse in studses:
            attended = studse.attended
            if attended is False:
                check += 1

        try:
            studentcourse.strike = check
            studentcourse.save()
        except StudentCourse.DoesNotExist:
            # Handle the case where StudentCourse does not exist for the student
            pass

    
   

    # Prepare a list to store serialized student course information
    student_table_info = []

    for department in departments:
      
        department_serializer = DepartmentSerializer(department).data
        student_table_info.append({
        'class': department_serializer
         })

        lecturer_courses = Course.objects.filter(department=department, lecturer=lecturer)

        for lecturer_course in lecturer_courses:

            course_serializer = CourseSerializer(lecturer_course).data 
            student_table_info.append({
                'course': course_serializer
            })

            students = Student.objects.filter(
            studentcourse__course=lecturer_course, studentcourse__course__lecturer=lecturer) 

            # Prefetch student courses related to the default course
            student_courses = StudentCourse.objects.filter(student__in=students)

            for student_course in student_courses:
                # Retrieve sessions for the current student course
                student_sessions = StudentSession.objects.filter(studentcourse=student_course)
       
                student_serializer = StudentSerializer(student_course.student).data
                serialized_student_course = StudentCourseSerializer(student_course).data
                serialized_student_sessions = StudentSessionSerializer(student_sessions, many=True).data

                student_table_info.append({
                'student': student_serializer,
                'student_course': serialized_student_course,
                'student_sessions': serialized_student_sessions
                })         
            


    session_serializer = SessionSerializer(sessions, many=True).data
    course_serializer = CourseSerializer(courses, many=True).data
    department_serializer = DepartmentSerializer(departments, many=True).data

    response_data = {
        'student_info': student_table_info,
        'classes': department_serializer,
        'lecturer_courses': course_serializer,
    }

    return Response(response_data, status=status.HTTP_200_OK)
