import random

from django.core.management.base import BaseCommand
from user.models import User
from string import ascii_letters
from todo_drf.secrets import SUPERUSER_NAME, SUPERUSER_PASSWORD


class Command(BaseCommand):
    ascii_letters = ascii_letters.lower()
    help = 'Creates several users and superuser'

    def handle(self, *args, **options):
        try:
            superuser = User.objects.create_superuser(SUPERUSER_NAME, '123@mail.ru', SUPERUSER_PASSWORD)
            superuser.save()
        except Exception as e:
            self.stderr.write(self.style.ERROR(e))
        for i in range(100):
            try:
                i = str(i)
                username = ''.join([random.choice(ascii_letters) for j in range(10)])
                password = ''.join([random.choice(ascii_letters) for j in range(10)])
                first_name = random.choice(['Ivan', 'Dmitry', 'Kirill', 'Alexey', 'Sasha', 'Davyd', 'Egor', 'Anton'])
                last_name = random.choice(['Ivanov', 'Kozlov', 'Shirshin', 'Egorov', 'Alexeev', 'Andreev', 'Aleev'])
                user = User.objects.create_user(username=f'{username}', email=f'{username}@mail.ru',
                                                password=password, first_name=first_name, last_name=last_name)
                user.save()

                self.stdout.write(self.style.SUCCESS(f'Succesfully created user {i}'))
            except Exception as e:
                self.stderr.write(self.style.ERROR(e))
