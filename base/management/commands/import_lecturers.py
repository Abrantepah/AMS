# your_app_name/management/commands/import_lecturers.py
import csv
from django.core.management.base import BaseCommand
from base.models import Lecturer, Department  # Import Department model


class Command(BaseCommand):
    help = 'Import data from CSV to populate the Lecturer model'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = 'base/csvFiles/lecturers.csv'

        # Open the CSV file
        with open(csv_file_path, 'r') as csv_file:
            # Create a CSV reader
            csv_reader = csv.reader(csv_file)

            # Skip the header row if it exists
            header = next(csv_reader, None)

            # Iterate over the rows and create Lecturer objects
            for row in csv_reader:
                # Extract data from the row
                # Assuming your CSV has columns for name, SN, and department
                name, reference, department_names, email = row

                # Create a Lecturer object
                lecturer = Lecturer.objects.create(
                    name=name,
                    reference=reference,
                    email=email,
                )

                # Split the department_names and associate with the course
                for department_name in department_names.split(','):
                    department_name = department_name.strip()
                    department, created = Department.objects.get_or_create(
                        dname=department_name,
                    )
                    lecturer.department.add(department)

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
