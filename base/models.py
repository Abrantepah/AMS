# models.py
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.db import IntegrityError


class Department(models.Model):
    dno = models.PositiveIntegerField(unique=True)
    dname = models.CharField(max_length=100)

    def __str__(self):
        return self.dname


class Lecturer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    reference = models.CharField(max_length=12, unique=True)
    email = models.EmailField(null=True, unique=True)
    passwordChanged = models.BooleanField(default=False)
    department = models.ManyToManyField(Department)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        full_name = self.name

        # Define a list of titles to be excluded
        titles_to_exclude = ["Prof.", "Rev.", "Dr.", "Mr.", "Mrs.", "Miss."]

        # Split the name based on titles
        for title in titles_to_exclude:
            full_name = full_name.replace(title, '')

        # Remove extra spaces and get the name part
        name_without_title = ' '.join(full_name.split()).strip()

        # Split the name into parts
        name_parts = name_without_title.split()

        # Extract initials from non-title parts of the name (excluding the last name)
        initials = [name_part[0].lower()
                    for name_part in name_parts[:-1] if name_part]

        # Concatenate the initials to form the username
        username = ''.join(initials)

        # Append the last name to the username
        username += slugify(name_parts[-1]).lower()

        first_name = name_parts[0] if name_parts else ""

        # Last name is the rest of the parts
        last_name = name_parts[-1] if name_parts else ""

        # Create a User instance
        user, created = User.objects.get_or_create(
            username=self.reference,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
                'email': self.email
            }
        )

        if created:
            password = User.objects.make_random_password()
            user.set_password(password)
            user.save()

            try:
                # Send an email with a link to set the password
                subject = 'Your Lecturer Account Details'
                message = render_to_string('base/user_details_email.html', {
                    'username': username,
                    'firstname': name_parts[0],
                    'reference': self.reference,
                    'password': password,

                })
                plain_message = strip_tags(message)

                send_mail(
                    subject,
                    plain_message,
                    'christianidanfrowne@gmail.com',
                    [self.email],
                    html_message=message,
                )

            except Exception as e:
                print(f"Error sending email: {e}")

        # Link the User instance to the Student instance
        self.user = user

        super().save(*args, **kwargs)


class Course(models.Model):
    name = models.CharField(max_length=40)
    code = models.CharField(max_length=13, unique=True)
    department = models.ManyToManyField(Department)
    # numgroups = models.PositiveIntegerField(default=1)
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
    ) + timezone.timedelta(minutes=10))  # Initial expiration time

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
        #   for i in range(instance.numgroups):
        for i in range(15):
            session = Session.objects.create(
                course=instance,
                date=timezone.now().date(),  # Set the date to current date
                time=timezone.now().time(),  # Set the time to current time
                # Initial expiration time
                expiration_time=timezone.now() + timezone.timedelta(minutes=40)
            )


class Usernames_only(models.Model):
    save_usernames = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.save_usernames


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reference = models.CharField(max_length=12, unique=True)
    index = models.CharField(max_length=12, unique=True)
    name = models.CharField(max_length=70)
    year = models.PositiveIntegerField()
    # group = models.PositiveIntegerField(null=True)
    # email = models.EmailField(null=True, unique=True)
    UUID = models.CharField(max_length=38, null=True, blank=True, unique=True)
    UUID_sent = models.BooleanField(default=False)
    passwordChanged = models.BooleanField(default=False)
    # i will add all the strikes gained from the courses not attended and save them here
    Total_strike = models.PositiveIntegerField(default=0, editable=False)
    programme = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.UUID is None or not self.UUID.strip():
            self.UUID = str(uuid.uuid4())

        # Split the name into parts
        name_parts = self.name.split()

        # Extract initials from middle names (if available) and the first name
        initials = [name_part[0].lower()
                    for name_part in name_parts[:-1] if name_part]

        # Concatenate the initials to form the username
        base_username = ''.join(initials) + slugify(name_parts[-1]).lower()

        # Create a User instance with a unique username
        user_created = False
        suffix = 1
        while not user_created:
            try:
                usernames_instance = Usernames_only.objects.get(
                    save_usernames=base_username)
                base_username = f"{base_username}{suffix}"
            except Usernames_only.DoesNotExist:
                pass

            # Create an instance of Usernames_only and save it to the database
            usernames_instance, created = Usernames_only.objects.get_or_create(
                save_usernames=base_username
            )
            usernames_instance.save()

            # Attempt to create a User instance with the generated username
            user, created = User.objects.get_or_create(
                username=self.reference,
                defaults={
                    'first_name': name_parts[0],
                    'last_name': name_parts[-1],
                    # 'email': self.email  # Use the student's email for the User instance
                }
            )
            user_created = True

            # If a username clash occurs, increment the suffix and try again
            suffix += 1

        if created:
            # password = User.objects.make_random_password()
            user.set_password("CS2024")
            user.save()

            # try:
            #     # Send an email with a link to set the password
            #     subject = 'Your Student Account Details'
            #     message = render_to_string('base/user_details_email.html', {
            #         'username': username,
            #         'firstname': name_parts[0],
            #         'reference': self.reference,
            #         'password': password,
            #     })
            #     plain_message = strip_tags(message)

            #     send_mail(
            #         subject,
            #         plain_message,
            #         'christianidanfrowne@gmail.com',
            #         [self.email],
            #         html_message=message,
            #     )

            # except Exception as e:
            #     print(f"Error sending email: {e}")

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
    attended_start = models.BooleanField(null=True)
    attended_end = models.BooleanField(null=True)
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
