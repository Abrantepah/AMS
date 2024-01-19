usernames = 'idan', 'kofi'
name = 'idan'
suffix = 1
for username in usernames:
    if username == name:
        name = f"{name}{suffix}"

print(name)
