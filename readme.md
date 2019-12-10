# Namify

## Description

Namify is an app created for BITL CS Project 2. This app can predict your age, gender and nationality based on your first name.

---

## Requirements

- Docker v^19

---

## Setup
1. Build Docker image
```
docker build --tag namify .
```

2. Run the Docker image with port `3333` exposed
```
docker run -d --name namify -p 3333:3333 namify
```

App then will be served on port `3333` through link `localhost:3333`

---

## Stoping the app
To stop the container run:
```
docker stop namify
```

After that you can delete the image by running:
```
docker rm namify
```

---
## Author
Karlis Gustavs Logins

karlis.gustavs.logins@gmail.com