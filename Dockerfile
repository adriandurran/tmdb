FROM node:latest as build-deps
RUN mkdir -p /usr/src/app/build
WORKDIR /usr/src/app/build
COPY client/build/ ./
# RUN yarn
# COPY client ./
# RUN yarn build
FROM node:latest
RUN mkdir -p /usr/src/app/client
COPY --from=build-deps /usr/src/app/build /usr/src/app/client
COPY server/. /usr/src/app
WORKDIR /usr/src/app
RUN yarn install
WORKDIR /usr/src/app
EXPOSE 3050
LABEL maintainer="adrian.durran100@mod.gov.uk"
CMD ["node", "index.js"]