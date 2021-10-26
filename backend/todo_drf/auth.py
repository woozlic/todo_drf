from rest_framework.authentication import SessionAuthentication


class CustomSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        pass
