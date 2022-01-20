FROM node:13.12.0-alpine3.11

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install -f
RUN npm install react-scripts@3.4.1 -g


COPY . ./

CMD ["npm", "start"]