FROM node:latest

WORKDIR /usr/src/app

RUN git clone https://github.com/Vertex-PI/Front-end.git

WORKDIR /usr/src/app/Front-end

RUN npm install

EXPOSE 3333

CMD ["npm", "start"]