# syntax=docker/dockerfile:1
FROM python:3
WORKDIR /code



COPY requirements.txt /code
COPY entrypoint.sh /code


RUN pip3 install -r requirements.txt

COPY . /code/

ENTRYPOINT ["sh", "entrypoint.sh"]
