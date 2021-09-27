import random

from django.core.management.base import BaseCommand
from user.models import User
from string import ascii_letters


class Command(BaseCommand):
    help = 'Creates several users and superuser'

    def handle(self, *args, **options):
        try:
            superuser = User.objects.create_superuser(f'woozlic', '123@mail.ru', '123')
            superuser.save()
        except Exception as e:
            self.stderr.write(self.style.ERROR(e))
        for i in range(1000):
            try:
                i = str(i)
                username = ''.join([random.choice(ascii_letters) for j in range(10)])
                password = ''.join([random.choice(ascii_letters) for j in range(10)])
                user = User.objects.create_user(username=f'user_{username}', email=f'{username}@mail.ru',
                                                password=password, first_name="Ivan", last_name=username)
                user.save()

                self.stdout.write(self.style.SUCCESS(f'Succesfully created user {i}'))
            except Exception as e:
                self.stderr.write(self.style.ERROR(e))
