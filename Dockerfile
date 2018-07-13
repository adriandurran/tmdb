FROM node:10
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN mkdir -p /usr/src/app/client
COPY server/. /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY client /usr/src/app/client
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
WORKDIR /usr/src/app
ENV NODE_ENV production
EXPOSE 3050
CMD ["node", "index.js"]