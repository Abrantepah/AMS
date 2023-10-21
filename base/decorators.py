# # # decorators.py

from django.http import HttpResponse
from ams import settings

def restrict_to_router(view_func):
    def _wrapped(request, *args, **kwargs):
        client_ip = request.META.get('REMOTE_ADDR')
        # if client_ip != settings.ROUTER_ALLOWED_IP:
        #     return HttpResponse("Access Denied", status=403)
        return view_func(request, *args, **kwargs)
    return _wrapped

