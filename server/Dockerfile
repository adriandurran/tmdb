FROM node:latest
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY wait-for.sh /usr/src/app
RUN chmod +x /usr/src/app/wait-for.sh
RUN npm install
EXPOSE 3050
CMD ["npm", "start"]