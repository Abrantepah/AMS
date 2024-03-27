from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    # default page which is the students login page
    path('', views.student_login, name="login"),
    # lecturers login page
    path('lecturer_login/', views.Lecturer_login,
         name="lecturer_login"),
    # skip this for now
    path('email_password/',
         views.email_password, name="email_password"),
    # after first time logging in, redirect user to change password
    path('changedefaultpassword/',
         views.changeDefaultPassword, name="changedefaultpassword"),
    # after resetting password redirect to this page
    path('password_reset_complete/', views.password_reset_complete,
         name='password_reset_complete'),
    # logout user
    path('logout/', views.logoutUser, name="logout"),
    # after lecturer logs in, this is the next page
    path('lecturerhome/', views.LecturerHome, name="lecturer_home"),
    # clicking the generate button in the lecturer page, should redirect to this page with the generated code
    path('generate/<str:code>/', views.GeneratePage, name='generate'),
    path('generate_verification_code/', views.generate_verification_code,
         name='generate_verification_code'),
    # verification of generated code by student page, this page opens after the student has login
    path('verification_page/', views.VerifyCode, name='verify'),
    # after student verify code, redirects user to student home page
    path('studenthome/<str:code>/', views.StudentHome, name="student_home"),
    # click attendance button from the student home page to be redirect to the page
    path('attendance/<str:code>/', views.MarkAttendance, name="attendancepage"),
    # redirect to this page after attendance is marked
    path('closing/', views.Closing, name='closing'),
    path('get_sessions_for_course/', views.get_sessions_for_course,
         name='get_sessions_for_course'),
    path('table/', views.TablePage, name="table"),
    path('tablehome/', views.TableHome, name="table_home"),
    path('students', views.StudentsTable, name="students_table"),
    path('permission/', views.PermissionTable, name="permission_table"),
    path('Help/', views.Help, name="help"),
    path('askpermission/', views.Permission, name="permission"),
    path('get_sessions/', views.get_sessions,
         name='get_sessions'),
    path('get_file_content/', views.get_file_content, name="get_file"),
    path('update_permission/', views.update_permission, name="updatepermission"),
]
