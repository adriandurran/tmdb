FROM nginx
LABEL maintainer="adrian.durran100@mod.gov.uk"
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]