from .models import Lecturer, Course, Student, StudentCourse, StudentSession, Session
from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.models import User
from .models import Department, Student, Course, Lecturer, VerificationCode, Session, StudentCourse, Attendance, StudentSession, StudentCode, StudentPermission
from .forms import LecturerForm, DepartmentForm, CourseForm
from django.contrib.auth import authenticate, login, logout
import string
import secrets
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from datetime import timedelta
from django.utils import timezone
import math
from django.http import HttpResponse
from django.db.models import F, ExpressionWrapper, IntegerField

# from .decorators import restrict_to_router


# @restrict_to_router
def student_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User credentials are valid, log in the user
            login(request, user)
            # Check if the user has a related Student object
            if Student.objects.filter(user=user).exists():
                # Redirect to the verify code page for students
                return redirect('verify')
            elif Lecturer.objects.filter(user=user).exists():
                return redirect('login')
        else:
            # User credentials are invalid, show an error message
            error_message = 'Invalid login credentials. Please try again.'
            return render(request, 'base/login_page.html', {'error_message': error_message})

    return render(request, 'base/login_page.html')


def Lecturer_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        sessions = Session.objects.filter(attendance__attended=True)

        # Annotate the StudentSession objects with the same modulo operation
        studentsessions = StudentSession.objects.all()

        func_values = [(session.id - 1) % 15 + 1 for session in sessions]

        for func in func_values:
            for studentsession in studentsessions:
                var = ((studentsession.id - 1) % 15) + 1
                if var == func:
                    mark = studentsession.attended
                    if mark is None:
                        mark = False
                    if mark is False:
                        mark = False
                    else:
                        mark = True
                    studentsession.attended = mark  # Set the value explicitly
                    studentsession.save()

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User credentials are valid, log in the user
            login(request, user)
            # Check if the user has a related Student object
            if Student.objects.filter(user=user).exists():
                # Redirect to the verify code page for students
                return redirect('login')
            elif Lecturer.objects.filter(user=user).exists():
                # Redirect to the dashboard or any desired page after successful login
                return redirect('lecturer_home')
        else:
            # User credentials are invalid, show an error message
            error_message = 'Invalid login credentials. Please try again.'
            return render(request, 'base/lecturer_login.html', {'error_message': error_message})

    return render(request, 'base/lecturer_login.html')


@login_required(login_url='/')
def StudentHome(request, code):
    # Check if the user is authenticated (logged in)
    if request.user.is_authenticated:
        # Get the currently logged-in student
        student = Student.objects.get(user=request.user)

        if request.method == "POST":

            return redirect('attendancepage', code=code)
        # You can now access the student's attributes like student.name, student.roll_number, etc.

        context = {'student': student}
        return render(request, 'base/home_page.html', context)
    else:
        # Handle the case when the user is not logged in
        # You might want to redirect to a login page or show an error message.
        # For example:

        return render(request, 'base/login_page.html')


def generate_verification_code(lecturer, course, session, expiration_minutes, latitude, longitude):
    # Your code to generate the verification code
    alphabet = string.ascii_letters + string.digits
    verification_code = ''.join(secrets.choice(alphabet) for i in range(6))

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


@login_required(login_url='/')
def VerifyCode(request):
    error_message = None
    current_time = timezone.now()

    if request.method == 'POST':
        code = request.POST.get('code')
        try:
            verification_code = VerificationCode.objects.get(
                code=code, used=False)
            session = verification_code.session
        except VerificationCode.DoesNotExist:
            error_message = 'Invalid Verification code. Please try again.'
        else:
            if verification_code.expiration_time <= current_time or StudentCode.objects.filter(code=code, student=request.user.student).exists():
                verification_code.used = True
                verification_code.save()
                error_message = 'Verification code has expired.'
            else:
                # Get the student's location
                student_latitude = float(request.POST.get('latitude'))
                student_longitude = float(request.POST.get('longitude'))
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
                    error_message = 'you are not within the location radius.'
                else:
                    session.expiration_time = current_time + \
                        timedelta(minutes=5)
                    verification_code.used = False
                    session.save()
                    verification_code.save()

                    if not request.user.is_staff:
                        student = Student.objects.get(user=request.user)

                        try:
                            student_course = StudentCourse.objects.get(
                                student=student, course=verification_code.course)
                        except StudentCourse.DoesNotExist:
                            error_message = f"You are not enrolled in {verification_code.course}. Invalid login credentials. Please try again."
                        else:
                            if student.year != verification_code.course.year:
                                error_message = "Enrollment year does not match the course. Check details and try again."
                            else:
                                # load the message.success in a green-covered text
                                messages.success(
                                    request, 'Verification successful. You can now log in.')
                                return redirect('student_home', code=code)

    return render(request, 'base/verify_code.html', {'error_message': error_message})


@login_required(login_url='/')
def MarkAttendance(request, code):
    verification_code = get_object_or_404(VerificationCode, code=code)
    lecturer = verification_code.lecturer
    course = verification_code.course
    session = verification_code.session
    student_course = StudentCourse.objects.get(
        student=request.user.student, course=course)  # Use get() here
    session_id = session.id


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
        return redirect('login')

    if request.method == 'POST':
        # Check if the student is eligible to mark attendance
        if time_remaining > 0:

            attendance_type = request.POST.get('attendance_type')
            if attendance_type == 'start':

                studentcode, created = StudentCode.objects.get_or_create(
                    student=request.user.student,
                    code=code,
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

        return redirect('closing')

    attendance_marked_start = Attendance.objects.filter(
        session=session, attended_start=True).exists()

    context = {
        'verification_code': verification_code,
        'lecturer': lecturer,
        'course': course,
        'session': session,
        'time_remaining': time_remaining,
        'attendance_marked_start': attendance_marked_start,
    }

    return render(request, 'base/attendance_page.html', context)


@login_required(login_url='/')
def Closing(request):

    return render(request, 'base/closing.html')


@login_required(login_url='/')
def LecturerHome(request):

    if request.user.is_authenticated:

        # uncomment when all the database is preped
        #  students = Student.objects.all()
        # for student in students:
        #     try:
        #         studentcourse = StudentCourse.objects.get(student=student)
        #     except StudentCourse.DoesNotExist:

        #         studses = StudentSession.objects.filter(
        #             studentcourse=studentcourse)

        #         # Initialize the check variable inside the loop for each student
        #     check = 0

        #     for studse in studses:
        #         attended = studse.attended
        #         if attended is False:
        #             check += 1

        #     try:
        #         studentcourse.strike = check
        #         studentcourse.save()
        #     except StudentCourse.DoesNotExist:
        #         # Handle the case where StudentCourse does not exist for the student
        #         pass

        lecturer = Lecturer.objects.get(user=request.user)
        courses = Course.objects.filter(lecturer=lecturer)

        # Get the first course in the list of courses
        default_course = courses.first()

        # Filter the sessions for the default course and lecturer
        sessions = Session.objects.filter(course=default_course)
        available_sessions = [
            session for session in sessions if not session.is_attended()]

        if request.method == 'POST':
            selected_course_id = request.POST.get('course')
            selected_course = get_object_or_404(
                Course, id=selected_course_id)

            selected_session_id = request.POST.get('session')
            selected_session = get_object_or_404(
                Session, id=selected_session_id)

            selected_latitude = request.POST.get('latitude')
            selected_longitude = request.POST.get('longitude')

            # minutes it takes for code to expire
            expiration_minutes = 3

            # Generate a verification code
            code = generate_verification_code(
                lecturer, selected_course, selected_session, expiration_minutes, selected_latitude, selected_longitude)

            # Pass the filtered sessions to the context
            return redirect('generate', code=code.code)
        context = {'lecturer': lecturer, 'courses': courses,
                   'available_sessions': available_sessions, }
        return render(request, 'base/Staff_page.html', context)
    else:
        return render(request, 'base/lecturer_login.html')


def get_sessions_for_course(request):
    if request.method == 'GET':
        selected_course_id = request.GET.get('course_id')
        selected_course = get_object_or_404(Course, id=selected_course_id)

        sessions = Session.objects.filter(course=selected_course)
        available_sessions = [
            session.id for session in sessions if not session.is_attended()]

        data = {
            'available_sessions': available_sessions,
        }

        return JsonResponse(data)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required(login_url='/')
def GeneratePage(request, code):
    # Retrieve the VerificationCode object with the given code
    verification_code = get_object_or_404(VerificationCode, code=code)

    context = {'code': code, 'verification_code': verification_code}
    return render(request, 'base/generate.html', context)


@login_required(login_url='/')
def TablePage(request):

    students_table_url = reverse("students_table")
    table_home_url = reverse("table_home")
    permission_table_url = reverse("permission_table")
    context = {'table_home_url': table_home_url, 'students_table_url':
               students_table_url, 'permission_table_url': permission_table_url}

    return render(request, 'base/table.html', context)


@login_required(login_url='/')
def TableHome(request):

    context = {}
    return render(request, 'base/home.html', context)


@login_required(login_url='/')
def StudentsTable(request):
    # Get the lecturer associated with the current user
    lecturer = Lecturer.objects.get(user=request.user)

    # Get all courses related to the lecturer
    lecturer_courses = Course.objects.filter(lecturer=lecturer)

    if lecturer_courses.exists():
        default_course_id = lecturer_courses.first().id
        default_course = Course.objects.filter(id=default_course_id)
    else:
        # Handle the case where no courses are associated with the lecturer
        default_course = None

    sessions = Session.objects.filter(course__in=default_course)

    # Get all students enrolled in the courses related to the lecturer
    students = Student.objects.filter(
        studentcourse__course__in=lecturer_courses)

    departments_with_lecturer = Department.objects.filter(
        lecturer__isnull=False)

    if request.method == 'POST':
        # Use request.POST to retrieve form data from a POST request
        indexF = request.POST.get('indexFilter')
        courseF = request.POST.get('courseFilter')
        programmeF = request.POST.get('programmeFilter')
        yearF = request.POST.get('yearFilter')
        strikeF = request.POST.get('strikesFilter')
        nameF = request.POST.get('nameFilter')

    # Apply filters based on user input
        if indexF:
            students = Student.objects.filter(
                index__icontains=indexF,  studentcourse__course__lecturer=lecturer)
        if courseF:
            students = Student.objects.filter(
                studentcourse__course__name=courseF, studentcourse__course__lecturer=lecturer)
        if programmeF:
            students = Student.objects.filter(
                programme=programmeF, studentcourse__course__lecturer=lecturer)
        if yearF:
            students = Student.objects.filter(
                year=yearF, studentcourse__course__lecturer=lecturer)
        if strikeF:
            if strikeF == '4':
                students = Student.objects.filter(studentcourse__strike__range=[
                    4, 15], studentcourse__course__lecturer=lecturer)
            else:
                students = Student.objects.filter(studentcourse__strike=int(
                    strikeF), studentcourse__course__lecturer=lecturer)
        if nameF:
            students = Student.objects.filter(
                name__icontains=nameF, studentcourse__course__lecturer=lecturer)
    else:
        students = Student.objects.filter(
            studentcourse__course__in=lecturer_courses)

    # Prepare a dictionary to store student information and strikes
    student_info = {}

    for student in students:
        studentcourse = StudentCourse.objects.get(
            student=student, course__lecturer=lecturer)
        studses = StudentSession.objects.filter(studentcourse=studentcourse)

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

        # Get the StudentCourse objects for the student and courses combination
        student_courses = StudentCourse.objects.filter(
            student=student, course__in=lecturer_courses)

        # Store student information and strikes in the dictionary
        student_info[student] = {
            'student': student,
            'student_courses': []
        }

        for student_course in student_courses:
            # Get the strikes for that StudentCourse object
            strikes = student_course.strike

            # Get the individual student sessions for this student and course combination
            studentsessions = StudentSession.objects.filter(
                studentcourse=student_course)

            student_info[student]['student_courses'].append({
                'course': student_course.course,
                'strikes': strikes,
                'studentsessions': studentsessions,
            })

    context = {'student_info': student_info,
               'sessions': sessions,
               'lecturer_courses': lecturer_courses,
               'departments': departments_with_lecturer,
               }
    return render(request, 'base/Students.html', context)


@login_required(login_url='/')
def PermissionTable(request):
    lecturer = Lecturer.objects.get(user=request.user)
    lecturer_courses = Course.objects.filter(lecturer=lecturer)
    course_id = '1'
    courses = Course.objects.get(lecturer=lecturer, id=course_id)
    studentcourses = StudentCourse.objects.filter(course=courses)

    if request.method == 'POST':
        # Use request.POST to retrieve form data from a POST request
        indexF = request.POST.get('indexFilter')
        courseF = request.POST.get('courseFilter')
        programmeF = request.POST.get('programmeFilter')
        yearF = request.POST.get('yearFilter')
        strikeF = request.POST.get('strikesFilter')
        nameF = request.POST.get('nameFilter')

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
    else:

        studentcourses = StudentCourse.objects.filter(course=courses)

    departments_with_lecturer = Department.objects.filter(
        lecturer__isnull=False)

    context = {'studentcourses': studentcourses,
               'lecturer_courses': lecturer_courses,
               'courses': courses,
               'departments': departments_with_lecturer
               }
    return render(request, 'base/permission.html', context)


# def CreateStudent(request):

#     if request.method == 'POST':
#         username = request.POST.get('username')
#         reference = request.POST.get('reference')
#         password = request.POST.get('password')

#         try:
#             user = User.objects.get(username=username)
#         except:
#             messages.error(request, 'User does not exist')

#     login = Course.objects.all()
#     context = {'login': login}
#     return render(request, 'base/login_page.html', context)


@login_required(login_url='/')
def Help(request):
    return render(request, 'base/help.html')


@login_required(login_url='/')
def Permission(request):

    student = request.user.student

    studentcourse = StudentCourse.objects.filter(student=student)

    context = {'studentcourse': studentcourse, }

    return render(request, 'base/permission_page.html')


# def SForm(request):
#     form = StudentForm()
#     if request.method == 'POST':
#         form = StudentForm(request.POST)
#         if form.is_valid():
#             form.save()

#     context = {'form': form}
#     return render(request, 'base/Sforms.html', context)

def DForm(request):
    form = DepartmentForm()
    if request.method == 'POST':
        form = DepartmentForm(request.POST)
        if form.is_valid():
            form.save()

    context = {'form': form}
    return render(request, 'base/dform.html', context)


def CForm(request):
    form = CourseForm()
    if request.method == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            form.save()

    context = {'form': form}
    return render(request, 'base/cform.html', context)


def LForm(request):
    form = LecturerForm()
    if request.method == 'POST':
        form = LecturerForm(request.POST)
        if form.is_valid():
            form.save()

    context = {'form': form}
    return render(request, 'base/Lform.html', context)
