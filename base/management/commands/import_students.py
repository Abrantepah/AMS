# your_app_name/management/commands/import_students.py
import csv
from django.core.management.base import BaseCommand
from base.models import Student, Department  # Import Department model
import random


class Command(BaseCommand):
    help = 'Import data from CSV to populate the students model'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = 'base/csvFiles/french.csv'

        # Open the CSV file
        with open(csv_file_path, 'r') as csv_file:
            # Create a CSV reader
            csv_reader = csv.reader(csv_file)

            # Skip the header row if it exists
            header = next(csv_reader, None)

            # Iterate over the rows and create Lecturer objects
            for row in csv_reader:
                # Extract data from the row
                reference, surname, othername = row

                name = othername + ' ' + surname
                # reference, department_name, name = row

                # name_parts = name.split(', ')
                # formatted_name = ' '.join(name_parts[::-1])

                # formatted_department = department_name.title()

                while True:
                    index = str(random.randint(100000, 999999))
                    if not Student.objects.filter(index=index).exists():
                        break

                department_name = "French"
                # Get or create the Department object
                department, created = Department.objects.get_or_create(
                    dname=department_name,
                )

                # Create a Lecturer object
                Student.objects.create(
                    reference=reference,
                    name=name,
                    year=1,
                    programme=department,
                    index=index
                )

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
