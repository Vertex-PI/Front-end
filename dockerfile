FROM node:20.12.2
WORKDIR /Vertex
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]