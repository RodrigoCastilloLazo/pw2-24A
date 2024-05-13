FROM ubuntu:20.04

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y apache2 git

RUN rm -rf /var/www/html/*

WORKDIR /
RUN git clone https://github.com/RodrigoCastilloLazo/pw2-24A.git .

RUN cp -r pw2-24A/lab02/exercises/* /var/www/html

EXPOSE 8084

CMD ["apache2ctl", "-D", "FOREGROUND"]

