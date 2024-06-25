FROM node:18-alpine as base

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

FROM base as dev
# Run the nextjs app
CMD ["npm", "run", "dev"]

FROM base as prod
# Run the nextjs app
CMD ["npm", "run", "start"]