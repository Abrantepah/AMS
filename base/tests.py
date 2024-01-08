from django.utils.text import slugify
# Example name
full_name = "Prof. Kate Appiah"

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

# First name is the first part
first_name = name_parts[0] if name_parts else ""

# Last name is the rest of the parts
last_name = name_parts[-1] if name_parts else ""

print("First name:", first_name)
print("Last name:", last_name)
print("username: ", username)


print(name_without_title)
