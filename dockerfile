FROM node:20.12.2
WORKDIR /Front-end
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]