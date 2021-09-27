FROM node:16

RUN npm install -g yarn --force

WORKDIR /app

COPY package*.json ./
RUN yarn
RUN yarn global add pm2

COPY . .

CMD ["yarn","production-start"]