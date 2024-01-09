# your_app_name/management/commands/import_students.py
import csv
from django.core.management.base import BaseCommand
from base.models import Student, Department  # Import Department model


class Command(BaseCommand):
    help = 'Import data from CSV to populate the Lecturer model'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = 'base/csvFiles/students.csv'

        # Open the CSV file
        with open(csv_file_path, 'r') as csv_file:
            # Create a CSV reader
            csv_reader = csv.reader(csv_file)

            # Skip the header row if it exists
            header = next(csv_reader, None)

            # Iterate over the rows and create Lecturer objects
            for row in csv_reader:
                # Extract data from the row
                reference, index, name, year, programme, email = row

                # Get or create the Department object
                department, created = Department.objects.get_or_create(
                    dname=programme,
                )

                # Create a Lecturer object
                Student.objects.create(
                    reference=reference,
                    index=index,
                    name=name,
                    year=year,
                    programme=department,
                    email=email
                )

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
