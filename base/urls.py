from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.student_login, name="login"),
    path('lecturer_login/', views.Lecturer_login, name="lecturer_login"),
    path('email_password/',
         views.email_password, name="email_password"),
    path('changedefaultpassword/',
         views.changeDefaultPassword, name="changedefaultpassword"),
    path('password_reset_complete/', views.password_reset_complete,
         name='password_reset_complete'),
    path('logout/', views.logoutUser, name="logout"),
    path('studenthome/<str:code>/', views.StudentHome, name="student_home"),
    path('lecturerhome/', views.LecturerHome, name="lecturer_home"),
    path('generate/<str:code>/', views.GeneratePage, name='generate'),
    path('generate_verification_code/', views.generate_verification_code,
         name='generate_verification_code'),
    path('verification_page/', views.VerifyCode, name='verify'),
    path('attendance/<str:code>/', views.MarkAttendance, name="attendancepage"),
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
