FROM node:16

WORKDIR /usr/src/app
RUN apt-get update && apt-get install --no-install-recommends -y
RUN npm i -g typescript
COPY package*.json ./
RUN npm i
COPY ./src/ ./src
COPY ./tsconfig.json ./tsconfig.json 
RUN tsc

EXPOSE 5005
CMD [ "node", "./dist/main.js" ]