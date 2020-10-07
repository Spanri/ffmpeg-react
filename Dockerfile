FROM node:12-alpine as builder

WORKDIR /var/www/ffmpeg
COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]