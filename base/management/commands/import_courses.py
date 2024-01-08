# your_app_name/management/commands/import_courses.py
import csv
from django.core.management.base import BaseCommand
from base.models import Course, Department, Lecturer  # Import Department model


class Command(BaseCommand):
    help = 'Import data from CSV to populate the Lecturer model'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = 'base/csvFiles/courses.csv'

        # Open the CSV file
        with open(csv_file_path, 'r') as csv_file:
            # Create a CSV reader
            csv_reader = csv.reader(csv_file)

            # Skip the header row if it exists
            header = next(csv_reader, None)

            # Iterate over the rows and create Lecturer objects
            for row in csv_reader:
                # Extract data from the row
                name, code, department, year, lecturer, lecturer_reference = row

                # Get or create the Department object
                department, created = Department.objects.get_or_create(
                    dname=department,
                )

                lecturer, created = Lecturer.objects.get_or_create(
                    name=lecturer, reference=lecturer_reference
                )

                # Create a Lecturer object
                Course.objects.create(
                    name=name,
                    code=code,
                    department=department,
                    year=year,
                    lecturer=lecturer
                )

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
