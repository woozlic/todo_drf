from django.core.management.base import BaseCommand
from user.models import User


class Command(BaseCommand):
    help = 'Creates several users and superuser'

    def handle(self, *args, **options):
        try:
            superuser = User.objects.create_superuser(f'woozlic', '123@mail.ru', '123')
            superuser.save()
        except Exception as e:
            self.stderr.write(self.style.ERROR(e))
        for i in range(3):
            try:
                i = str(i)
                user = User.objects.create_user(f'user_{i}', f'user_{i}@mail.ru', '94182fkoasdfrRF21')
                user.save()

                self.stdout.write(self.style.SUCCESS(f'Succesfully created user {i}'))
            except Exception as e:
                self.stderr.write(self.style.ERROR(e))
