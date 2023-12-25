FROM node:18 AS builder

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /usr/src/app/

COPY --from=builder /usr/src/app .

CMD ["yarn", "start"]
