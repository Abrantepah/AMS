from django.urls import path
from .api_views import get_students, get_lecturers, StudentLoginAPIView, LecturerLoginAPIView, student_home, permission_api

urlpatterns = [
    path('api/students/', get_students, name='get_students'),
    path('api/lecturers/', get_lecturers, name='get_lecturers'),
    path('api/student-login/', StudentLoginAPIView.as_view(), name='student_login'),
    path('api/lecturer-login/', LecturerLoginAPIView.as_view(),
         name='lecturer_login'),
    path('api/student-home/<int:user_id>/', student_home, name='student_home'),
    path('api/permission/<int:user_id>/', permission_api),
    path('api/permission/<int:user_id>/<int:course_id>/',
         permission_api, name='permission_api'),

]
