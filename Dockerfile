FROM node:10 as build-deps
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY client/package.json ./
RUN yarn
COPY client ./
RUN yarn build
FROM node:10
RUN mkdir -p /usr/src/app/client
COPY --from=build-deps /usr/src/app/build /usr/src/app/client
COPY server/. /usr/src/app
WORKDIR /usr/src/app
RUN npm install
WORKDIR /usr/src/app
EXPOSE 3050
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
CMD ["node", "index.js"]