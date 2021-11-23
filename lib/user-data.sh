#!/bin/bash


sudo apt update
sudo apt install -y apache2

sudo service apache2 start


sudo echo "<h1>Que onda desde $(hostname -f)</h1>" > /var/www/html/index.html
