FROM nginx
LABEL maintainer="adrian.durran100@mod.gov.uk"
RUN rm /etc/nginx/nginx.conf
COPY /config/nginx.conf /etc/nginx/nginx.conf
COPY /config/server.key /etc/ssl/private/server.key
COPY /config/server.crt /etc/ssl/certs/server.crt
EXPOSE 80
EXPOSE 443
# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]