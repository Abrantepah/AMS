# models.py
import re
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator


class Department(models.Model):
    dno = models.PositiveIntegerField(unique=True)
    dname = models.CharField(max_length=100)

    def __str__(self):
        return self.dname


class Lecturer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    SN = models.PositiveIntegerField(unique=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Extract initials from the name (excluding titles like "Prof." or "Rev.")
        initials = [name_part[0].lower() for name_part in re.sub(
            r'\b(?:Prof\.|Rev\.|Dr\.|Mr\.|Mrs\.|Miss\.)\b', '', self.name).split()]

        # Concatenate the initials and the last name to form the username
        username = ''.join(initials) + slugify(self.name.split()[-1]).lower()

        # Create a User instance
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'first_name': self.name.split()[0],
                'last_name': self.name.split()[-1],
                'email': f"{username}@example.com"
            }
        )

        # Set a unique random password if the user is newly created
        if created:
            user.set_password(User.objects.make_random_password())
            user.save()

        # Link the User instance to the Lecturer instance
        self.user = user

        super().save(*args, **kwargs)


class Course(models.Model):
    name = models.CharField(max_length=40)
    code = models.PositiveIntegerField(unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    year = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(8)
        ]
    )
    lecturer = models.ForeignKey(Lecturer, on_delete=models.PROTECT, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Session(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    expiration_time = models.DateTimeField(default=timezone.now(
    ) + timezone.timedelta(minutes=40))  # Initial expiration time

    def is_attended(self):
        return self.attendance_set.filter(attended=True).exists()

    def save(self, *args, **kwargs):
        if not self.date:
            self.date = timezone.now().date()
        if not self.time:
            self.time = timezone.now().time()
        super().save(*args, **kwargs)


# Signal to automatically create 15 sessions for each course after course creation
@receiver(post_save, sender=Course)
def create_sessions(sender, instance, created, **kwargs):
    if created:
        for i in range(15):
            session = Session.objects.create(
                course=instance,
                date=timezone.now().date(),  # Set the date to current date
                time=timezone.now().time(),  # Set the time to current time
                # Initial expiration time
                expiration_time=timezone.now() + timezone.timedelta(minutes=40)
            )


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reference = models.PositiveIntegerField(unique=True)
    index = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=60)
    year = models.PositiveIntegerField()
    UUID = models.CharField(max_length=38, null=True, blank=True, unique=True)
    UUID_sent = models.BooleanField(default=False)
    # i will add all the strikes gained from the courses not attended and save them here
    Total_strike = models.PositiveIntegerField(default=0, editable=False)
    programme = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.UUID is None or not self.UUID.strip():
            self.UUID = str(uuid.uuid4())

        # Extract initials from the first and last names
        initials = [name_part[0].lower() for name_part in self.name.split()]

        # Concatenate the initials and the last name to form the username
        username = ''.join(initials) + slugify(self.name.split()[-1]).lower()

        # Create a User instance
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'first_name': self.name.split()[0],
                'last_name': self.name.split()[-1],
                'email': f"{username}@example.com"
            }
        )

        # Set a unique random password if the user is newly created
        if created:
            user.set_password(User.objects.make_random_password())
            user.save()

        # Link the User instance to the Student instance
        self.user = user

        super().save(*args, **kwargs)


class StudentCode(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    used = models.BooleanField(default=False)


class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    strike = models.PositiveIntegerField(default=0)


@receiver(post_save, sender=Student)
def assign_program_courses(sender, instance, created, **kwargs):
    if created:
        if instance.programme:
            courses = Course.objects.filter(
                department=instance.programme, year=instance.year)
            for course in courses:
                StudentCourse.objects.create(student=instance, course=course)


class StudentSession(models.Model):
    studentcourse = models.ForeignKey(StudentCourse, on_delete=models.CASCADE)
    attended = models.BooleanField(null=True)
    date = models.DateField()
    time = models.TimeField()

    def is_attended(self):
        return self.attendance_set.filter(attended=True).exists()

    def save(self, *args, **kwargs):
        if not self.date:
            self.date = timezone.now().date()
        if not self.time:
            self.time = timezone.now().time()
        super().save(*args, **kwargs)


@receiver(post_save, sender=StudentCourse)
def create_student_sessions(sender, instance, created, **kwargs):
    if created:
        for i in range(15):
            StudentSession.objects.create(
                studentcourse=instance,
                date=timezone.now().date(),
                time=timezone.now().time(),
            )


class StudentPermission(models.Model):
    studentsession = models.ForeignKey(
        StudentSession, on_delete=models.PROTECT)
    studentname = models.CharField(max_length=60)
    index = models.PositiveIntegerField()
    message = models.CharField(max_length=40, null=True)
    created = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=None, null=True)
    sent = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.message[0-30]


class VerificationCode(models.Model):
    code = models.CharField(max_length=10, unique=True)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    expiration_time = models.DateTimeField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=False)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=False)
    used = models.BooleanField(default=False)

    def __str__(self):
        return self.code


class Attendance(models.Model):
    StudentCourse = models.ForeignKey(StudentCourse, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    attended = models.BooleanField(default=False)
    attended_start = models.BooleanField(default=False)
    attended_end = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.attended_end and self.attended_start:
            self.attended = True

        super(Attendance, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.StudentCourse.student.name} - {self.StudentCourse.course.name} - Session {self.session.id}"
