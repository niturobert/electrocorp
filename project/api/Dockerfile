FROM python:3




RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install cmake python3-opencv -y


COPY requirements.txt /srv/app/requirements.txt

RUN pip install --no-cache-dir gunicorn \
 && pip install flask Flask-SQLAlchemy pyjwt psycopg2 face-recognition opencv-python


# && pip install --no-cache-dir -r /srv/app/requirements.txt


WORKDIR /usr/src/app
EXPOSE 80

# RUN ./initialize_db.py
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "80"]
