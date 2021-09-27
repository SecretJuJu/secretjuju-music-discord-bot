FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install yarn
RUN yarn


COPY . .

EXPOSE 443
CMD [ "yarn", "production-start" ]