FROM node:20.18.0-alpine3.19

WORKDIR /Mini-Api-

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]