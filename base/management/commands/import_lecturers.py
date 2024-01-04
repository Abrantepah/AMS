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
                name, SN, department_name = row

                # Get or create the Department object
                department, created = Department.objects.get_or_create(
                    dname=department_name,
                )

                # Create a Lecturer object
                Lecturer.objects.create(
                    name=name,
                    SN=SN,
                    department=department
                )

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
