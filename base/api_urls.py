from django.urls import path
from .api_views import get_students, get_lecturers, StudentLoginAPIView, LecturerLoginAPIView

urlpatterns = [
    path('api/students/', get_students, name='get_students'),
    path('api/lecturers/', get_lecturers, name='get_lecturers'),
    path('api/student-login/', StudentLoginAPIView.as_view(), name='student_login'),
    path('api/lecturer-login/', LecturerLoginAPIView.as_view(),
         name='lecturer_login'),
    # Add other API endpoints as needed
]
