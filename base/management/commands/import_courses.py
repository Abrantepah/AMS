# your_app_name/management/commands/import_courses.py
import csv
from django.core.management.base import BaseCommand
from base.models import Course, Department, Lecturer


class Command(BaseCommand):
    help = 'Import data from CSV to populate the Course model'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = 'base/csvFiles/courses.csv'

        # Open the CSV file
        with open(csv_file_path, 'r') as csv_file:
            # Create a CSV reader
            csv_reader = csv.reader(csv_file)

            # Skip the header row if it exists
            header = next(csv_reader, None)

            # Iterate over the rows and create Course objects
            for row in csv_reader:
                # Extract data from the row
                name, code, department_names, year, lecturer_name, lecturer_reference = row

                # Get or create the Lecturer object
                lecturer, created = Lecturer.objects.get_or_create(
                    name=lecturer_name, reference=lecturer_reference
                )

                # Create a Course object
                course = Course.objects.create(
                    name=name,
                    code=code,
                    year=year,
                    lecturer=lecturer
                )

                # Split the department_names and associate with the course
                for department_name in department_names.split(','):
                    department_name = department_name.strip()
                    department, created = Department.objects.get_or_create(
                        dname=department_name,
                    )
                    course.department.add(department)

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
