FROM node:18-slim

RUN apt-get update && apt-get install -y procps \
    bash \
    && rm -rf /var/lib/apt/lists/*

RUN npm config get registry
RUN npm install -g npm@10.2.4
RUN npm i -g @nestjs/cli@10.2.1

RUN mkdir -p /home/node/app

USER node

WORKDIR /home/node/app

COPY package.json .

COPY --chown=node:node . .

CMD [ "npm", "run", "start:dev" ]