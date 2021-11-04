#!/bin/bash

cd ./bosque-server

docker build -t bosque .

docker run -p 8092:8092 bosque
