# your_app_name/management/commands/import_departments.py
import csv
from django.core.management.base import BaseCommand
from base.models import Department


class Command(BaseCommand):
    help = 'Import data from CSV to populate the Department model'

    def handle(self, *args, **kwargs):
        # Path to your CSV file
        csv_file_path = 'base/csvFiles/departments.csv'

        # Open the CSV file
        with open(csv_file_path, 'r') as csv_file:
            # Create a CSV reader
            csv_reader = csv.reader(csv_file)

            # Skip the header row if it exists
            header = next(csv_reader, None)

            # Iterate over the rows and create Department objects
            for row in csv_reader:
                # Extract data from the row
                dno, dname = row

                # Create a Department object
                Department.objects.create(
                    dno=dno,
                    dname=dname
                )

        self.stdout.write(self.style.SUCCESS('Data import completed.'))
