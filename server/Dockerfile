FROM node:latest
LABEL maintainer="adrian.durran100mod.gov.uk"
RUN yarn global add nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
EXPOSE 3050
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait
CMD /wait && yarn start