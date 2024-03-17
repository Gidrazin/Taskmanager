FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt /app/
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /app/
CMD ["gunicorn", "Pie.wsgi:application", "--bind", "0:8001" ]