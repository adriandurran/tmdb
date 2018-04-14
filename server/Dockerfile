FROM node:latest
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 5050
CMD ["node", "index.js"]