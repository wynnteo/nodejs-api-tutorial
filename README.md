# nodejs-api-tutorial

Run NPM:
-------------------------------------------
1. Run command : npm start

Access URL : http://localhost:5000/api/products

Run Dockerfile:
-------------------------------------------
1. Run command : docker build -t nodejs-api-tutorial:latest .
2. Run command : docker run -d -p 8080:5000 --name my_docker nodejs-api-tutorial:latest

Access URL : http://localhost:8080/api/products