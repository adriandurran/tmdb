FROM node:latest as build-deps
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY client/package.json ./
RUN yarn
COPY client ./
RUN yarn build
FROM node:latest
RUN mkdir -p /usr/src/app/client
COPY --from=build-deps /usr/src/app/build /usr/src/app/client
COPY server/. /usr/src/app
WORKDIR /usr/src/app
RUN yarn install
RUN yarn global add pm2
EXPOSE 3050
LABEL maintainer="adrian.durran100@mod.gov.uk"
# CMD ["node", "index.js"]
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait
CMD /wait && yarn production