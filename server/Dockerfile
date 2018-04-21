FROM node
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --quiet
EXPOSE 3050
CMD ["nodemon", "index.js"]