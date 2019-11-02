FROM node:8

RUN mkdir -p /usr/scr/app

COPY ./package*.json /usr/scr/app

RUN npm i

COPY . /usr/scr/app

RUN npm i -g --save-dev nodemon

EXPOSE 8080

CMD [ "node", "app.js" ]