FROM node:10

ENV TZ="America/Chicago"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir src
COPY src ./src

CMD [ "node", "src/index.js" ]
