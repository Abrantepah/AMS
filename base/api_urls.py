from django.urls import path
from .api_views import get_students, get_lecturers, StudentLoginAPIView, LecturerLoginAPIView, student_home, permission_api, verification_api, MarkAttendance, generateCode_api, PermissionTable_api, update_permission_api

urlpatterns = [
    path('api/students/', get_students),
    path('api/lecturers/', get_lecturers),
    path('api/student-login/', StudentLoginAPIView.as_view()),
    path('api/lecturer-login/', LecturerLoginAPIView.as_view()),
    path('api/student-home/<int:user_id>/', student_home, name='student_home'),
    path('api/permission/<int:user_id>/', permission_api),
    path('api/verification_api/<int:user_id>/', verification_api),
    path('api/MarkAttendance/<int:user_id>/<str:code>/', MarkAttendance),
    path('api/generateCode/<int:user_id>/', generateCode_api),
    path('api/generateCode/<int:user_id>/<str:course_id>/', generateCode_api),
    path('api/PermissionTable_api/<int:user_id>/', PermissionTable_api),
    path('api/update_permission_api/<int:permission_id>/<str:messagestatus>/',
         update_permission_api),
]
