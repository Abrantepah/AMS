# # # decorators.py

# # from django.http import HttpResponse
# # from . import settings

# # def restrict_to_routers(view_func):
# #     def _wrapped(request, *args, **kwargs):
# #         client_ip = request.META.get('REMOTE_ADDR')
# #         if client_ip not in settings.ROUTER_ALLOWED_IP_RANGE:
# #             return HttpResponse("Access Denied", status=403)
# #         return view_func(request, *args, **kwargs)
# #     return _wrapped

# from functools import wraps
# from django.http import HttpResponse
# from .router_middleware import is_ip_in_range

# def restrict_by_ip_range(allowed_ip_range):
#     def decorator(view_func):
#         @wraps(view_func)
#         def _wrapped_view(request, *args, **kwargs):
#             client_ip = request.META.get('REMOTE_ADDR')

#             if is_ip_in_range(client_ip, allowed_ip_range):
#                 return view_func(request, *args, **kwargs)
#             else:
#                 return HttpResponse("Access Denied", status=403)

#         return _wrapped_view

#     return decorator
