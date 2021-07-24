FROM node

WORKDIR /usr/src

COPY package.json /usr/src
COPY package-lock.json /usr/src

RUN npm install --global yarn
RUN yarn add
CMD ['yarn', 'start']