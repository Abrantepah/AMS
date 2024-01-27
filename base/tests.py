import math
student_latitude = float(6.6742804)
student_longitude = float(-1.5519787)
verification_latitude = float(6.6745606)
verification_longitude = float(-1.5513591)

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
max_distance = 0.03  # Change to 1.0 for kilometers

print(verification_latitude)
# Perform the radius check
if distance > max_distance:
    print('you are not within the location radius')
