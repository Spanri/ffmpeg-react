# pull official base image
FROM node:12.18.3

WORKDIR /var/www/app

# "node-sass": "^5.0.0",
# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# Copy file from "reality" to image
COPY . ./

RUN ls

# install and cache app dependencies
RUN npm install

EXPOSE 3000

# Will be done every time you start the container
CMD ["npm", "start"]