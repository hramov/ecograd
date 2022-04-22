FROM node:17

WORKDIR /usr/src/app
RUN apt-get update && apt-get install --no-install-recommends -y
RUN npm i -g typescript
COPY package*.json ./
RUN npm i
COPY ./src/ ./
COPY ./tsconfig.json ./tsconfig.json 
RUN mkdir logs
RUN mkdir public
RUN tsc
RUN ls

EXPOSE 5005
CMD [ "node", "./dist/main.js" ]