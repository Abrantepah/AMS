# router_middleware.py
from django.http import HttpResponse

def is_valid_ipv4(ip):
    parts = ip.split('.')
    return len(parts) == 4 and all(part.isdigit() for part in parts)

def is_ip_in_range(client, main):
    if is_valid_ipv4(client) and is_valid_ipv4(main):
        client_parts = [int(part) for part in client.split('.')]
        main_parts = [int(part) for part in main.split('.')]
        
        if client_parts[:3] == main_parts[:3]:
            if client_parts[3] <= main_parts[3] <= 255:
                return True

    return False

class RouterAccessMiddleware:
    def __init__(self, get_response, allowed_ip_range):
        self.get_response = get_response
        self.allowed_ip_range = allowed_ip_range
       

    def __call__(self, request):
        client_ip = request.META.get('REMOTE_ADDR')
        
        if not is_ip_in_range(client_ip, self.allowed_ip_range):
            return HttpResponse("Access Denied", status=403)

        return self.get_response(request)


# one = '123.45.67.5'
# two = '123.45.67.255'
# is_ip_in_range(one, two)