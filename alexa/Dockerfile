FROM node
RUN npm install nodemon -g
WORKDIR /app
EXPOSE 8200
EXPOSE 8201
ENTRYPOINT ["nodemon", "--inspect=8201", "/app/index.js"]


