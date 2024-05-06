from .models import Lecturer, Course, Student, StudentCourse, StudentSession, Session
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
from django.db.models import F, Q


def student_login(request):
    if request.method == 'POST':
        username = request.POST['reference']
        password = request.POST['password']
        reference = request.POST['reference']

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User credentials are valid, log in the user
            login(request, user)

            if Student.objects.filter(user=user, reference=reference, passwordChanged=False).exists():
                return redirect('changedefaultpassword')
            elif Lecturer.objects.filter(user=user, reference=reference).exists():
                return redirect('lecturer_login')
            # Check if the user has a related Student object
            elif Student.objects.filter(user=user, reference=reference).exists():
                # Redirect to the verify code page for students
                return redirect('verify')
                # return redirect('permission')
        else:
            # User credentials are invalid, show an error message
            error_message = 'Invalid login credentials. Please try again.'
            return render(request, 'base/login_page.html', {'error_message': error_message})

    return render(request, 'base/login_page.html') #add the student login template here


def Lecturer_login(request):
    if request.method == 'POST':
        username = request.POST['reference'] 
        password = request.POST['password']
        reference = request.POST['reference']

        # Authenticate the user based on reference, username, and password
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User credentials are valid, log in the user
            login(request, user)

            if Lecturer.objects.filter(user=user, reference=reference, passwordChanged=False).exists():
                return redirect('changedefaultpassword')
            elif Student.objects.filter(user=user, reference=reference).exists():
                return redirect('login')

            elif Lecturer.objects.filter(user=user, reference=reference).exists():
                # Redirect to the dashboard or any desired page after successful login
                return redirect('lecturer_home')
        else:
            # User credentials are invalid, show an error message
            error_message = 'Invalid login credentials. Please try again.'
            return render(request, 'base/lecturer_login.html', {'error_message': error_message})

    return render(request, 'base/lecturer_login.html') 


def email_password(request):
    # add a timer to the message sent, if expired, make link expired

    return render(request, 'base/user_details_email.html/')


@login_required(login_url='/')
def changeDefaultPassword(request):
    error_message = ''

    try:
        if request.user.is_authenticated:
            user = request.user
    except User.DoesNotExist:
        user = None
        return redirect('login')

    if user:
        try:
            if Student.objects.filter(user=user, passwordChanged=False).exists():
                allow_user = user
                student = Student.objects.get(
                    user=user)
                lecturer = None
            elif Lecturer.objects.filter(user=user, passwordChanged=False).exists():
                allow_user = user
                lecturer = Lecturer.objects.get(
                    user=user)
                student = None
        except student and lecturer is None:
            return redirect('password_reset_complete')

        if lecturer or student:
            if request.method == "POST":
                first_password = request.POST.get('first_input')
                second_password = request.POST.get('second_input')

                if str(first_password) == str(second_password):
                    password = second_password
                    allow_user.set_password(password)
                    allow_user.save()
                    if student:
                        student.passwordChanged = True
                        student.save()
                    elif lecturer:
                        lecturer.passwordChanged = True
                        lecturer.save()
                    return redirect('password_reset_complete')
                else:
                    error_message = 'Password mismatched'

    return render(request, 'base/password.html', {'error_message': error_message})


def password_reset_complete(request):
    return render(request, 'base/password_reset_complete.html')


def logoutUser(request):

    logout(request)
    return redirect('login')


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


# verify the code and proceed to the student home with the code
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
        return redirect('login')

    if request.method == 'POST':
        # Check if the student is eligible to mark attendanc
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
        'session': displaysession,
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
            expiration_minutes = 20

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
        default_course = Course.objects.get(id=default_course_id)
        display = 'Course: ' + default_course.name + \
            ' (Year:' + str(default_course.year) + ')'

    else:
        # Handle the case where no courses are associated with the lecturer
        default_course = None
        display = ''

    sessions = Session.objects.filter(course=default_course).annotate(
        student_session_modulo=((F('id') - 1) % 15) + 1
    )

    # Get all students enrolled in the courses related to the lecturer
    students = Student.objects.filter(
        studentcourse__course=default_course)

    departments_with_lecturer = Department.objects.filter(
        lecturer=lecturer)

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
            display = 'Index Number: ' + indexF
        if courseF:
            students = Student.objects.filter(
                studentcourse__course__name=courseF, studentcourse__course__lecturer=lecturer)
            default_course = Course.objects.get(name=courseF)
            display = 'Course: ' + default_course.name + \
                ' (Year:' + str(default_course.year) + ')'

        if programmeF:
            students = Student.objects.filter(
                programme=programmeF, studentcourse__course__lecturer=lecturer)
            programmeName = Department.objects.get(id=programmeF)
            display = 'Programme: ' + str(programmeName.dname)
        if yearF:
            students = Student.objects.filter(
                year=yearF, studentcourse__course__lecturer=lecturer)
            display = 'Year: ' + yearF
        if strikeF:
            if strikeF == '4':
                students = Student.objects.filter(studentcourse__strike__range=[
                    4, 15], studentcourse__course__lecturer=lecturer)
            else:
                students = Student.objects.filter(studentcourse__strike=int(
                    strikeF), studentcourse__course__lecturer=lecturer)
            display = 'Number of Absences: ' + strikeF
        if nameF:
            students = Student.objects.filter(
                name__icontains=nameF, studentcourse__course__lecturer=lecturer)
            display = 'Name: ' + nameF
    else:
        students = Student.objects.filter(
            studentcourse__course=default_course)
        display = 'Course: ' + default_course.name + \
            ' (Year:' + str(default_course.year) + ')'

    Tsessions = Session.objects.filter(
        attendance__attended=True, course=default_course)

    func_values = [(session.id - 1) % 15 + 1 for session in Tsessions]

    # Prepare a dictionary to store student information and strikes
    student_info = {}

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
               'displayFilter': display
               }
    return render(request, 'base/Students.html', context)


@login_required(login_url='/')
def PermissionTable(request):
    lecturer = Lecturer.objects.get(user=request.user)
    lecturer_courses = Course.objects.filter(lecturer=lecturer)

    studentcourses = StudentCourse.objects.filter(course__in=lecturer_courses)

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

        studentcourses = StudentCourse.objects.filter(
            course__in=lecturer_courses)

    sps = StudentPermission.objects.filter(
        studentsession__studentcourse__in=studentcourses,
        status=None
    )

    departments_with_lecturer = Department.objects.filter(
        lecturer=lecturer)

    # change permission status and update strike

    context = {'studentcourses': studentcourses,
               'sps': sps,
               'lecturer_courses': lecturer_courses,
               'departments': departments_with_lecturer
               }
    return render(request, 'base/permission.html', context)


def get_file_content(request):
    permission_id = request.GET.get('permission_id')
    permission = get_object_or_404(StudentPermission, id=permission_id)
    content = permission.message  # Assuming message contains the file content
    return JsonResponse({'content': content})


def update_permission(request):
    permission_id = request.GET.get('permission_id')
    accept = request.GET.get('accept')

    permission = get_object_or_404(StudentPermission, id=permission_id)

    studentsession_id = permission.studentsession.id

    studentsession = StudentSession.objects.get(id=studentsession_id)
    # Update fields based on user's acceptance
    if accept.lower() == 'true':
        studentsession.attended = True
    permission.status = True
    permission.save()
    studentsession.save()

    return JsonResponse({'message': 'Permission updated successfully'})


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
    error_message = ''
    success_message = ''

    if student and request.method == 'POST':
        try:
            code = request.POST.get('verificationcode')
            message = request.POST.get('message')
            verification_code = VerificationCode.objects.get(
                code=code, used=False)
            session = verification_code.session
            course = verification_code.course
            student_course = StudentCourse.objects.get(
                student=student, course=course)
            studentsessions = StudentSession.objects.filter(
                Q(studentcourse=student_course, attended=False) | Q(
                    studentcourse=student_course, attended=None)
            ).exclude(studentpermission__sent=True)
        except VerificationCode.DoesNotExist:
            error_message = 'Wrong verification code'
        except StudentCourse.DoesNotExist:
            error_message = 'You are not enrolled in this course'
        except Exception as e:
            error_message = str(e)

        if not error_message:
            if studentsessions.exists():
                studentsession = studentsessions.first()
            else:
                studentsession = None

            current_time = timezone.now()
            if verification_code.expiration_time <= current_time or StudentCode.objects.filter(code=code, student=student).exists():
                verification_code.used = True
                verification_code.save()
                error_message = 'Verification code has expired'
            else:
                session.expiration_time = current_time + timedelta(minutes=5)
                verification_code.used = False
                session.save()
                verification_code.save()

                student_permission, created = StudentPermission.objects.get_or_create(
                    studentsession=studentsession,
                    message=message,
                    studentname=student.name,
                    index=student.index,
                    sent=True,
                )

                if created:
                    student_permission.save()
                    verification_code.used = True
                    verification_code.save()
                    success_message = 'Message sent successfully'
                    # Consider using redirect after a successful post to avoid re-posting on page refresh
                    return render(request, 'base/permission_page.html', {'success_message': success_message})

    return render(request, 'base/permission_page.html', {'error_message': error_message, 'success_message': success_message})


def get_sessions(request):
    if request.method == 'GET':
        student = request.user.student
        selected_course_id = request.GET.get('course_id')

        # Get the selected course
        selected_course = get_object_or_404(Course, id=selected_course_id)

        try:
            # Get the specific StudentCourse for the logged-in student and selected course
            studentcourse = StudentCourse.objects.get(
                student=student, course=selected_course)

            # Get sessions for the selected studentcourse
            sessions = StudentSession.objects.filter(
                Q(studentcourse=studentcourse, attended=False) | Q(
                    studentcourse=studentcourse, attended=None)
            ).exclude(studentpermission__sent=True).annotate(
                student_session_modulo=((F('id') - 1) % 15) + 1
            )
            # Convert the sessions into a list of dictionaries
            sessions_data = [
                {'id': session.id} for session in sessions]

            data = {
                'sessions': sessions_data,
            }

            return JsonResponse(data)

        except StudentCourse.DoesNotExist:
            return JsonResponse({'error': 'StudentCourse not found for the specified student and course.'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


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
