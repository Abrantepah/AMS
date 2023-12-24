from django.test import TestCase
import math


# Create your tests here.
student_latitude = float(6.76259)
student_longitude = float(-1.679845)
verification_latitude = float(6.7644227)
verification_longitude = float(-1.6786504)

# Calculate the distance between the two sets of coordinates using the Haversine formula
radius = 6371  # Earth's radius in kilometers
lat1 = math.radians(student_latitude)
lon1 = math.radians(student_longitude)
lat2 = math.radians(verification_latitude)
lon2 = math.radians(verification_longitude)

delta_lat = lat2 - lat1
delta_lon = lon2 - lon1

a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1) * \
    math.cos(lat2) * math.sin(delta_lon / 2) ** 2
c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
distance = radius * c  # Distance in kilometers

# Assuming you want to allow a maximum distance of, for example, 1 kilometer
max_distance = 0.05

if distance > max_distance:
    print('distance ' + str(distance) + ' location in range')
else:
    print('distance ' + str(distance) + ' location not in range')
