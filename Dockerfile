FROM python:alpine3.7
COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 3333

CMD python ./main.py

# docker build --tag namify .
# docker run -d --name namify -p 3333:3333 namify
# docker stop namify
# docker rm namify
