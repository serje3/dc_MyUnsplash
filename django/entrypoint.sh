#!/bin/bash

cd unsplash || exit



python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input

coverage run --source='.' manage.py test
coverage report

##coverage annotate -d annotates/
ls
exec gunicorn unsplash.wsgi:application -b 0.0.0.0:8000 --reload --chdir "/home/serje3/Dev/Reps/my-unsplash-master/django/unsplash/" --log-syslog

