#!/bin/bash

cd ./bosque-server

docker build -t bosque .

docker run -p 9901:9901 bosque
