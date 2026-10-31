FROM node:26

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG PORT
ENV SERVER_PORT=$PORT
EXPOSE $SERVER_PORT

CMD ["npm", "start"]
