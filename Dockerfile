# # pull official base image
FROM node:13.12.0-alpine

# RUN mkdir /usr/src/app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /app/package.json
RUN npm install

# add app
ADD . /app

# start app
CMD ["npm", "start"]