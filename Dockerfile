FROM node:8

RUN mkdir -p /usr/src/got/

WORKDIR /usr/src/got/

COPY package*.json /usr/src/got/

RUN npm i

COPY . /usr/src/app

RUN npm i -g --save-dev nodemon

EXPOSE 8080

CMD [ "node", "app.js" ]